import React from 'react'
import { firestore } from '../lib/firebase'

import Task from '../components/Task'
import AddTask from '../components/AddTask'
import ProjectList from '../components/ProjectList'
import Actions from '../components/Actions'

var userid = require('js-cookie').get('userid')

class Index extends React.Component {
  constructor(props) {
    super(props)

    // If no user, redirect to login page
    if (!userid) {
      window.location.pathname = '/-/join'
    }

    this.state = {
      tasks: [], // tasks in current project
      project: {} // current project
    }

    // Initially, get tasks, projects, etc.
    this._updateContent()
  }

  _updateContent = () => {
    // Get project from url
    var project = this.props.location.pathname.match(/project\/(.*)/)

    // When url is /, get all tasks, otherwise, get tasks that are in the project in the url
    var query = project
      ? firestore
          .collection('tasks')
          .where('project', '==', project[1])
          .orderBy('timestamp')
      : firestore
          .collection('tasks')
          .orderBy('timestamp')
    
    // Preform the query
    query.onSnapshot(doc => {
      var tasks = []
      doc.forEach(x => tasks.push(x))
      // Set state to those tasks
      this.setState({ tasks })
    })

    // If there is a project in the url, get the project from firebase too
    if (project) {
      firestore
        .doc('projects/' + project[1])
        .onSnapshot(doc => {
          this.setState({ project: doc })
        })
    }
  }

  componentDidUpdate(prevProps) {
    // If the url hasn't changed, don't update the componenet
    if (prevProps.location === this.props.location) {
      return
    }

    this._updateContent()
  }

  render() {
    // Check if location is / (all tasks)
    var isAllTasks = window.location.pathname === '/'
    return (
      <div style={{
        width: '90vw',
        maxWidth: '900px',
        margin: '5em auto',
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gridGap: '24px'
      }}>
        <div>
          <h1>{
            // If there is a project, get it's title, otherwise, 'all tasks'
            Object.keys(this.state.project).length
            ? this.state.project.data().title
            : 'All Tasks'
          }</h1>
          <div className="cf">
            <AddTask />
            <Actions project={this.state.project} />
          </div>
          <div>
            {
              // Get tasks in state and render as <Task />
              this.state.tasks.map(x => 
                <Task key={x.id} task={x} isAllTasks={isAllTasks} />
              )
            }
          </div>
        </div>

        <ProjectList />
      </div>
    )
  }
}

export default Index
