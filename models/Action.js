'use strict'

/**
 * Dependencies
 */

const db = require('../db/client.js')

/**
 * Define model
 */

class Action {
  static async all() {
    return await db('actions')
  }

  static async find(id) {
    return await db('actions').where('id', id).first()
  }

  static async insert(action) {
    return db('actions')
      .insert(action)
      .then(([id]) => Action.find(id))
  }

  static async update(id, changes) {
    return db('actions')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? Action.find(id) : null))
  }

  static async remove(id) {
    return await db('actions').where('id', id).del()
  }
}

/**
 * Export model
 */

module.exports = Action
