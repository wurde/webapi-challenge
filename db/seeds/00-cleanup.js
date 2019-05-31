'use strict'

/**
 * Dependencies
 */

const cleaner = require('knex-cleaner')

/**
 * Export seed
 */

exports.seed = function(knex) {
  return cleaner.clean(knex)
}
