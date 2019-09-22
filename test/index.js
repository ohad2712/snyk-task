const Chai = require('chai')

const expect = Chai.expect

const { convertPackageVersion, parsePackage, isEmpty, packageHasDependencies, packageHasDevDependencies } = require('../src/helpers/dependencyHelper') 
const expectedTreeForModule = require('./data/async@1.3.0/dependenciesTree')

describe('NPM Service', () => {
  describe('General behavior', () => {
    before(() => {
      // Create an instance of the server
    })

    it('should return the dependencies tree for a specific package for the default (3) level to fetch to', () => {
      // GET to /packages/async/1.3.0/tree
      // expect(computedTree).to.deeply.equal(expectedTreeForModule)
    })

    describe('Caching', () => {
      before(() => {
        // Create a client for the db
      })
      after(() => {
        // Close the client
      })
      afterEach(() => {
        // Free up the db
      })
      it('should store data in cache and use it in similar future packages requests', () => {

      })
    })
  })

  describe('Helper Functionality', () => {
    describe('#convertPackageVersion', () => {
      // Add all different patterns for possible versions (scoped, regular, range, etc.)
    })

    describe('#parsePackage', () => {
      // Add all different patterns for package name and versions (packageName@packageVersionOrTag)
    })

    describe('#isEmpty', () => {
      it('should return `true` when an object is empty ({})', () => {
      })

      it('should return `false` when an object isnt empty', () => {
      })
    })

    describe('#packageHasDependencies', () => {
      it('should return `true` when an object has a `dependencies` key', () => {
      })

      it('should return `false` when an object doesnt have a `dependencies` key', () => {
      })
    })

    describe('#packageHasDevDependencies', () => {
      it('should return `true` when an object has a `devDependencies` key', () => {
      })

      it('should return `false` when an object doesnt have a `devDependencies` key', () => {
      })
    })
  })

  describe('Errors', () => {
    // Add tests here
  })
})