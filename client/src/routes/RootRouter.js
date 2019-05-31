'use strict'

/**
 * Dependencies
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * Define router
 */

function RootRouter() {
  return (
    <>
      <Route exact path="/" render={() => <Redirect to="/projects" />} />
    </>
  )
}

/**
 * Export router
 */

export default RootRouter
