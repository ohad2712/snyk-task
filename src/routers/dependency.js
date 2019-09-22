'use strict'

const Express = require('express')

const Dependency = require('../dependency')
const Validations = require('../validations/dependency')

const router = Express.Router()

router.get('/:name/:version/tree', Validations.validatePackage, getDependenciesTree)

async function getDependenciesTree(req, res) {
  try {
    const packageName = req.params.name
    const packageVersion = req.params.version
    const levelToFetchTo = 3

    const dependency = new Dependency(packageName, packageVersion)
    
    await dependency.getDependenciesTree(levelToFetchTo)
    
    res.status(200).json(dependency)
    res.end()
  }
  catch (err) {
    res.status(err.status || 500).json(err)
    res.end()
  }
}

module.exports = router
