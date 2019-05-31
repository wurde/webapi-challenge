'use strict'

/**
 * Dependencies
 */

const db = require('../db/client.js')

/**
 * Define model
 */

class Project {
  static async all() {
    return await db('projects')
  }

  static async find(id) {
    let project = await db('projects').where('id', id).first()

    if (project && project.id) {
      project.actions = await db('actions').where('project_id', project.id)
    }

    return project
  }

  static async create(project) {
    let id = await db('projects').insert(project)

    let new_project = await db('projects').where('id', id[0]).limit(1)

    return new_project[0]
  }

  static update(id, changes) {
    return db('projects')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? Project.find(id) : null))
  }

  static async remove(id) {
    return await db('projects').where('id', id).del()
  }

  static async getProjectActions(project_id) {
    return await db('actions').where('project_id', project_id)
  }
}

/**
 * Export model
 */

module.exports = Project
