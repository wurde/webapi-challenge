'use strict'

/**
 * Dependencies
 */

import actions from '../actions/index'

/**
 * Constants
 */

const initialState = {
  isFetchingProjects: false,
  projects: [],
  error: null
}

/**
 * Define reducer
 */

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_PROJECTS_START:
      return Object.assign({}, state, {
        isFetchingPriorityLinks: true,
        error: ''
      })
    case actions.FETCH_PROJECTS_SUCCESS:
      let priority_links = {}

      action.payload.forEach(link => {
        priority_links[link.link_id] = (priority_links[link.link_id] || {})
        priority_links[link.link_id].categories = (priority_links[link.link_id].categories || [])

        priority_links[link.link_id] = {
          link_id: link.link_id,
          is_pinned: link.is_pinned,
          read: link.read,
          shared_by: link.shared_by,
          shared_with: link.shared_with,
          title: link.title,
          url: link.url,
          categories: priority_links[link.link_id].categories.concat({
            category_color: link.category_color,
            category_title: link.category_title,
            category_id: link.category_id,
          })
        }
      })

      let new_priority_links = Object.keys(priority_links).map(key => {
        return priority_links[key]
      })

      return Object.assign({}, state, {
        isFetchingPriorityLinks: false,
        priority_links: new_priority_links,
        error: ''
      })
    case actions.FETCH_PROJECTS_ERROR:
      return Object.assign({}, state, {
        isFetchingPriorityLinks: false,
        error: action.payload
      })
    default:
      return state
  }
}


/**
 * Export reducer
 */

export default usersReducer
