'use strict'

/**
 * Dependencies
 */

const express = require('express')
const helmet = require('helmet')

/**
 * Constants
 */

const port = 8080

/**
 * Define app
 */

const app = express()

/**
 * Configuration
 */

app.disable('x-powered-by')

/**
 * Middleware
 */

app.use(express.json())
app.use(helmet())

/**
 * Routes
 */

app.use('/', require('./routes/root_router'))
app.use('/projects', require('./routes/projects_router'))

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express server listening on ${port}.`)
  })
}

/**
 * Export app
 */

module.exports = app
