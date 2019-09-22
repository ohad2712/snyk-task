'use strict'

const BodyParser = require('body-parser')
const Express = require('express')
const ExpressValidator = require('express-validator')

const dependenciesRouter = require('./routers/dependency')

const port = 5745
const app = Express()

exports.init = () => {
  app.use(BodyParser.json())

  app.use('/packages', dependenciesRouter)

  app.listen(port, () => console.log(`Server is listening on port -> ${port}`))
}
