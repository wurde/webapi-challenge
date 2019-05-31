'use strict'

/**
 * Dependencies
 */

import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { RootRouter, ProjectsRouter } from './routes/index'
import store from './store/index'

/**
 * Importing global styles
 */

import './App.scss'

/**
 * Define component
 */

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootRouter mount="/" />
        <ProjectsRouter mount="/projects" />
      </BrowserRouter>
    </Provider>
  )
}

/**
 * Export component
 */

export default App
