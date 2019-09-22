'use strict'

const axios = require('axios')

const NPM_REGISTRY_URL = 'https://registry.npmjs.com'

exports.fetchPackage = async (name, version) => {
  return axios.get(`${NPM_REGISTRY_URL}/${name}/${version}`)
}