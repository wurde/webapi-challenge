'use strict'

/**
 * Dependencies
 */

const express = require('express')
const projectModel = require('../db/helpers/projectModel')

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
    try {
      let projects = await projectModel.all()

      res.status(200).json(projects)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during projects fetch.' }})
    }
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
