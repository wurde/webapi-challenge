'use strict'

/**
 * Dependencies
 */

const db = require('../client.js')
const mappers = {}

/**
 * Export model
 */

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
}

function get(id) {
  let query = db('projects as p')

  if (id) {
    query.where('p.id', id).first()

    const promises = [query, this.getProjectActions(id)]

    return Promise.all(promises).then(function(results) {
      let [project, actions] = results

      if (project) {
        project.actions = actions

        return projects
      } else {
        return null
      }
    })
  }

  return query.then(projects => {
    return projects
  })
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => this.get(id))
}

function update(id, changes) {
  return db('projects')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null))
}

function remove(id) {
  return db('projects')
    .where('id', id)
    .del()
}

function getProjectActions(projectId) {
  return db('actions')
    .where('project_id', projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)))
}
