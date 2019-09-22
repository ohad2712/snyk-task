'use strict'

const _ = require('lodash')

const NpmRegistry = require('./clients/npmRegistry')
const { getAsync, redisClient } = require('./clients/redis')
const { convertPackageVersion, parsePackage, isEmpty, packageHasDependencies, packageHasDevDependencies } = require('./helpers/dependencyHelper') 

class Dependency {
  constructor(name, version) {
    const packageFullName = `${name}@${version}`
    const parsedPackage = parsePackage(packageFullName)
    
    this.name = parsedPackage.name
    this.version = parsedPackage.version
    this.key = packageFullName
    this.dependencies = {}
  }

  async getDependenciesTree (levelToFetchTo) {
    try {
      if(levelToFetchTo < 1) {
        return this
      }

      this.version = convertPackageVersion(this.version)

      await this.propagateOwnDependencies()
      levelToFetchTo--

      if(!isEmpty(this.dependencies)) {
        await Promise.all(_.map(this.dependencies, async (dependency) => {
          return await dependency.getDependenciesTree(levelToFetchTo)
        }))
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  async propagateOwnDependencies() {
    try {
      let packageData = null
      let cachedData = await getAsync(this.key)

      if (cachedData) {
        console.log('Got data from cache')
        packageData = JSON.parse(cachedData)
      }
      else {
        packageData = await NpmRegistry.fetchPackage(this.name, this.version)
        packageData = packageData.data
        redisClient.set(this.key, JSON.stringify(packageData))
      }

      this.dependencies = this.getFirstOrderDependenciesNames(packageData)
    }
    catch (err) {
      this.dependencies = {}
      console.error(err)
    }
  }

  getFirstOrderDependenciesNames(packageData) {
    let allDependencies = []
    let dependencies = null
    let devDependencies = null

    if (packageHasDependencies(packageData)) {
      dependencies = packageData.dependencies || {}
    }
    if (packageHasDevDependencies(packageData)) {
      devDependencies = packageData.devDependencies || {}
    }

    allDependencies = _.merge(dependencies, devDependencies)

    const packageNames = Object.keys(allDependencies)
    
    return packageNames.map((name) => new Dependency(name, allDependencies[name]))
  }
}

module.exports = Dependency
