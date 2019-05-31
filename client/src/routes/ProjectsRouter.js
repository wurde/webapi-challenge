'use strict'

/**
 * Dependencies
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Projects } from '../views/index'

/**
 * Define router
 */

function ProjectsRouter({ mount }) {
  return (
    <>
      <Route path={`${mount}/projects`} render={Projects} />
    </>
  )
}

/**
 * Export router
 */

export default ProjectsRouter
