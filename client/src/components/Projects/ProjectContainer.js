'use strict'

/**
 * Dependencies
 */

import React from 'react'
import { connect } from 'react-redux'
import { ProjectContainerStyle } from './styles/index'
import actions from '../../store/actions/index'

/**
 * Constants
 */

const Component = React.Component
const getPriorityLinks = actions.getPriorityLinks

/**
 * Define component
 */

class ProjectContainer extends Component {
  componentDidMount() {
    this.props.getPriorityLinks(this.props.usersReducer.current_user_id)
  }

  render() {
    console.log("this.props.usersReducer.projects", this.props.usersReducer.projects)
    return (
      <ProjectContainerStyle>
        {(this.props.usersReducer.projects.length > 0) ?
          <div className="row">
            <div className="col-12">
              <h4>Priority</h4>

              <hr/>

              {(this.props.usersReducer.isFetchingPriorityLinks) ?
                <LinearProgress /> :
                <ul>
                  {this.props.usersReducer.projects.map((link, i) => <div key={i}></div>)}
                </ul>
              }
            </div>
          </div>
          : ''}
      </ProjectContainerStyle>
    )
  }
}

/**
 * Define mapStateToProps
 */

const mapStateToProps = (state) => {
  return state
}

/**
 * Export component
 */

export default connect(mapStateToProps, { getPriorityLinks })(ProjectContainer)
