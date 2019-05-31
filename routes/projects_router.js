'use strict'

/**
 * Dependencies
 */

const express = require('express')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Routes
 */

// GET,POST /projects
router.route('/')
  .get(async (req, res) => {
    res.sendStatus(200)
  })
  .post(async (req, res) => {
    res.sendStatus(200)
  })

// GET,PUT,DELETE /projects/:id
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
