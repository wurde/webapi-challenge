'use strict'

/**
 * Dependencies
 */

const express = require('express')
const Project = require('../models/Project')

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
      let projects = await Project.all()

      res.status(200).json(projects)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during projects fetch.' }})
    }
  })
  .post(async (req, res) => {
    try {
      if (!req.body.name || !req.body.description) {
        return res.status(400).json({ error: { message: 'Please provide name and description for the project.' }})
      }

      let project = await Project.create({
        name: req.body.name,
        description: req.body.description
      })

      if (project) {
        res.status(201).json(project)
      } else {
        res.status(500).json({ error: { message: 'Unknown error during project creation.' }})
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'There was an error while saving the project to the database.' }})
    }
  })

// GET,PUT,DELETE /projects/:id
router.route('/:id')
  .get(async (req, res) => {
    try {
      let project = await Project.find(req.params.id)

      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({ error: { message: 'Unable to find project.' }})
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during project fetch.' }})
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
