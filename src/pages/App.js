import React from 'react'

import ProjectList from '../components/ProjectList'
import TaskList from '../components/TaskList'
import Title from '../components/Title'
import Actions from '../components/Actions'

var userid = require('js-cookie').get('userid')

/*
  This is just a component which holds all the other components together as well as keeping track of the current project.
*/
class Index extends React.Component {
  constructor(props) {
    super(props)

    // If no user id in cookies, redirect to login page
    if (!userid) {
      window.location.pathname = '/-/join'
    }

    console.log(this.props.location)

    this.state = {
      currentProjectId: 'qQ4KmSLoxYMokynT6Tp0' //this.props.location // current project id
    }

    this._changeCurrentProject = this._changeCurrentProject.bind(this)
  }

  /**
   * _changeCurrentProject - change the project which is displayed
   * @param {String} newProjectId the project id to change to
   */
  _changeCurrentProject(newProjectId) {
    this.setState({ currentProjectId: newProjectId })
  }

  render() {
    return (
      <div className="container">
        <div className="container__left">
          <Title currentProjectId={this.state.currentProjectId} />
          {/* <Actions currentProjectId={this.state.currentProjectId} /> */}
          <TaskList currentProjectId={this.state.currentProjectId} />
        </div>
        <div className="container__right">
          {/* <ProjectList currentProjectId={this.state.currentProjectId} changeCurrentProject={this._changeCurrentProject} /> */}
        </div>
      </div>
    )
  }
}

export default Index
