'use strict'

/**
 * Dependencies
 */

import axios from 'axios'

/**
 * Constants
 */

// const backend_url = 'https://webapi-challenge-wurde.herokuapp.com/'
const backend_url = 'localhost:8080'
const FETCH_PROJECTS_START = 'FETCH_PROJECTS_START'
const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'

/**
 * Define actions
 */

const getPriorityLinks = () => dispatch => {
  dispatch({ type: FETCH_PROJECTS_START })

  return axios.get(`${backend_url}/projects`)
    .then(res => {
      dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: FETCH_PROJECTS_ERROR, payload: err })
    })
}

/**
 * Export actions
 */

export default {
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  getPriorityLinks,
}
