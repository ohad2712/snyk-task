'use strict'

const semver = require('semver')
const ValidateNpmPackageName = require('validate-npm-package-name')
const { param } = require('express-validator')

exports.validatePackage = [
  param('name', 'package name must be a valid name')
  .custom((name) => {
    return ValidateNpmPackageName(name).validForNewPackages
  }),
  param('version', 'package version or tag must be a valid version or tag')
  .custom((versionOrTag) => {
    return isValidVersion(versionOrTag) || isValidTag(versionOrTag)
  })
]

const isValidVersion = (version) => semver.valid(packageVersion) && semver.validRange(packageVersion)

const isValidTag = (tag) => !tag.match(/^[vV0-9]/i)
