'use strict'

/**
 * Dependencies
 */

const Action = require('../models/Action')

/**
 * Define middleware
 */

async function check_action_exists(req, res, next) {
  if (req.params.id) {
    let action = await Action.find(req.params.id)

    if (!action) {
      return res.status(404).json({ error: { message: 'Action not found.' }})
    }
  }

  next()
}

/**
 * Export middleware
 */

module.exports = check_action_exists
