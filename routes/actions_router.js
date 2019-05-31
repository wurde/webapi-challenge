'use strict'

/**
 * Dependencies
 */

const express = require('express')
const Action = require('../models/Action')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Routes
 */

// GET,POST /projects/:project_id/actions
router.route('/')
  .get(async (req, res) => {
    try {
      let actions = await Action.all(req.params.project_id)

      res.status(200).json(actions)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })
  .post(async (req, res) => {
    res.sendStatus(200)
  })

// GET,PUT,DELETE /projects/:project_id/actions/:id
router.route('/:id')
  .get(async (req, res) => {
    res.sendStatus(200)
  })
  .put(async (req, res) => {
    res.sendStatus(200)
  })
  .delete(async (req, res) => {
    res.sendStatus(200)
  })

/**
 * Export router
 */

module.exports = router
