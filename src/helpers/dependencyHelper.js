'use strict'

const _ = require('lodash')
const Npa = require('npm-package-arg')
const Semver = require('semver')

const convertPackageVersion = (version) => {
  if(Semver.validRange(version)){
    const versionObject = Semver.minVersion(version)
    if(versionObject) {
      version = versionObject.version
    }
  }
  else {
    if (Semver.valid(version)) {
      version = Semver.clean(version, { loose: true })
    }
  }

  return version
}

const parsePackage = (packageFullName) => {
  const parsed = Npa(packageFullName)
  const name = parsed.escapedName || (parsed.hosted && parsed.hosted.project)
  let version = parsed.scope ? '*' : parsed.fetchSpec

  if (parsed.scope) {
    version = '*' // This is a workaround since the npm-registry doesn't support scoped packages with version
  } 
  else { 
    if (parsed.type === 'git') {
      if (parsed.gitCommittish) {
        version = Semver.clean(parsed.gitCommittish)
      } 
      else {
        if (parsed.gitRange) {
          version = parsed.gitRange
        }
        else {
          version = 'latest'
        }
      }
    }
  }

  return { name, version }
}

const isEmpty = (obj) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

const packageHasDependencies = (packageData) => {
  return packageData.hasOwnProperty('dependencies') && !isEmpty(packageData.dependencies)
}

const packageHasDevDependencies = (packageData) => {
  return packageData.hasOwnProperty('devDependencies') && !isEmpty(packageData.devDependencies)
}

module.exports = { 
  convertPackageVersion,
  parsePackage,
  isEmpty,
  packageHasDependencies,
  packageHasDevDependencies
}
