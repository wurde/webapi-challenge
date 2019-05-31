'use strict'

/**
 * Dependencies
 */

const express = require('express')
const check_project_exists = require('../middleware/check_project_exists')
const check_action_exists = require('../middleware/check_action_exists')
const Project = require('../models/Project')
const Action = require('../models/Action')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Middleware
 *   check_project_exists
 */

router.use(check_project_exists)

/**
 * Routes
 *   GET,POST /projects/:project_id/actions
 */

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

/**
 * Middleware
 *   check_action_exists
 */

router.use(check_action_exists)

/**
 * Routes
 *   GET,PUT,DELETE /projects/:project_id/actions/:id
 */

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
    try {
      let action = await Action.find(req.params.id)

      if (action) {
        let updated_action = await Action.update(req.params.id, {
          description: (req.body.description || action.description),
          notes: (req.body.notes || action.notes)
        })

        res.status(200).json(updated_action)
      } else {
        res.status(404).json({ error: { message: 'Action not found.' }})
      }
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })
  .delete(async (req, res) => {
    try {
      let count = await Action.remove(req.params.id)

      if (count > 0) {
        res.sendStatus(200)
      } else {
        res.status(404).json({ error: { message: 'Action not found.' }})
      }
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })

/**
 * Export router
 */

module.exports = router
