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
        res.status(500).json({ error: { message: 'Server error.' }})
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error.' }})
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
        res.status(404).json({ error: { message: 'Project not found.' }})
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })
  .put(async (req, res) => {
    try {
      let project = await Project.find(req.params.id)

      if (project) {
        let project = await Project.update(req.params.id, {
          name: (req.body.name || project.name),
          description: (req.body.description || project.description)
        })

        res.status(200).json(project)
      } else {
        res.status(404).json({ error: { message: 'Project not found.' }})
      }
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })
  .delete(async (req, res) => {
    try {
      let count = await Project.remove(req.params.id)

      if (count > 0) {
        res.sendStatus(200)
      } else {
        res.status(404).json({ error: { message: 'Project not found.' }})
      }
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error.' }})
    }
  })

router.use('/:project_id', require('./actions_router'))

/**
 * Export router
 */

module.exports = router
