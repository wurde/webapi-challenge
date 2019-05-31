'use strict'

/**
 * Dependencies
 */

import { combineReducers } from 'redux'
import projectsReducer from './projectsReducer'

/**
 * Combine reducers
 */

const reducers = combineReducers({
  projectsReducer
})


/**
 * Export reducers
 */

export default reducers
