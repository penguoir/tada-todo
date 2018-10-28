import React from 'react'
import { connect } from 'react-redux'

import Task from './Task'
import AddTask from './AddTask'

class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { addingTask: false }
  }

  render() {
    return (
      <>
        <div className="db cf mt3 mb3">
          { <AddTask /> }
        </div>

        {this.props.tasks.map(x =>
          <div key={x.id}>{ <Task task={x} /> }</div>
        )}
      </>
    )
  }
}

export default connect(state => ({
  tasks: state.tasks
}))(TaskList)