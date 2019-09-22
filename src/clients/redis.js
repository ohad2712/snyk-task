'use strict'

const redis = require('redis')
const { promisify } = require('util')

const redisClient = redis.createClient()
const getAsync = promisify(redisClient.get).bind(redisClient)

redisClient.on('error', (err) => {
  console.error(`Error occured in Redis: ${err}`)
})

module.exports = { getAsync, redisClient }
