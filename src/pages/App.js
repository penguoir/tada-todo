import React from 'react'
import { connect } from 'react-redux'
import { changeProject } from '../store/actions/project'
import { getProjects } from '../store/actions/projects'

import TitleBar from '../components/TitleBar'
import TaskList from '../components/TaskList'
import ProjectList from '../components/ProjectList'

var userid = require('js-cookie').get('userid')

class Index extends React.Component {
  componentWillMount() {
    if (!userid) window.location = '/join'

    this.props.dispatch(getProjects())
  }

  render() {
    return (
      <div
        className="container mt5 center"
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gridGap: '32px'
        }}>
        <div>
          <TitleBar />
          <TaskList />
        </div>
        <ProjectList />
      </div>
    )
  }
}

export default connect(state => state)(Index)
