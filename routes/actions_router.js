'use strict'

/**
 * Dependencies
 */

const express = require('express')
const check_project_exists = require('../middleware/check_project_exists')
const Project = require('../models/Project')
const Action = require('../models/Action')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Middleware
 */

router.use(check_project_exists)

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
    try {
      if (!req.body.description || !req.body.notes) {
        return res.status(400).json({ error: { message: 'Please provide description and notes for the action.' }})
      }

      let action = await Action.create({
        description: req.body.description,
        notes: req.body.notes
      })

      if (action) {
        res.status(201).json(action)
      } else {
        res.status(500).json({ error: { message: 'Server error.' }})
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })

// GET,PUT,DELETE /projects/:project_id/actions/:id
router.route('/:id')
  .get(async (req, res) => {
    try {
      let action = await Action.find(req.params.id)

      if (action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({ error: { message: 'Action not found.' }})
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error.' }})
    }
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
