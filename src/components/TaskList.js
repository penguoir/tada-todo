import React from 'react'
import { firestore } from '../lib/firebase'

import Task from './Task'
import AddTask from './AddTask'
var userid = require('js-cookie').get('userid')

export default class TaskList extends React.Component {
  state = {
    tasks: []
  }

  _getData = async () => {
    var data

    try {
      // Get all tasks in current project from firebase
      data = await firestore
        .collection(`tasks`)
        .where('user', '==', userid)
        .where('project', '==', this.props.currentProjectId)
        .get()
    } catch (e) {
      // If no data for some reason, just show nothing
      return (<div></div>)
    }
  
    // Add each task to state
    var tasks = []
    data.forEach(task => tasks.push(task))

    this.setState({ tasks })
    return tasks
  }

  async componentDidMount() {
    await this._getData()
  }

  render() {
    return (
      <div>
        <AddTask currentProjectId={this.props.currentProjectId} />
        {/* If there are tasks, display them as <Task /> elements */}
        {
          this.state.tasks &&
          this.state.tasks.map(task =>
            <Task
              key={task.id}
              task={task}
              update={this._getData}
            />
          )
        }
      </div>
    )
  }
}