'use strict'

/**
 * Dependencies
 */

const db = require('../db/client.js')

/**
 * Define model
 */

class Action {
  static async all(project_id) {
    return await db('actions').where('project_id', project_id)
  }

  static async find(id) {
    return await db('actions').where('id', id).first()
  }

  static async create(action) {
    let id = await db('actions').insert(project)

    let new_action = await db('actions').where('id', id[0]).limit(1)

    return new_action[0]
  }

  static async update(id, changes) {
    await db('actions').where('id', id).update(changes)

    let actions = await db('actions').where('id', id).limit(1)

    return actions[0]
  }

  static async remove(id) {
    return await db('actions').where('id', id).del()
  }
}

/**
 * Export model
 */

module.exports = Action
