'use strict'

/**
 * Dependencies
 */

const knex = require('knex')
const knexConfig = require('../knexfile.js')

/**
 * Export client
 */

module.exports = knex(knexConfig.development)
