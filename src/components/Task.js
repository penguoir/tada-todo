import React from 'react'
import { Checkbox } from '@atlaskit/checkbox'
import { connect } from 'react-redux'
import { editTask, removeTask } from '../store/actions/task'

class Task extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      value: this.props.task.data().title,
      isDone: this.props.task.data().isDone
    }

    this.handleChange = this.handleChange.bind(this)
    this.commitChange = this.commitChange.bind(this)
    this.commitDone = this.commitDone.bind(this)
  }

  // When changing title, auto-update it in state
  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  // Commit a change to the task
  commitChange(e) {
    if (!e.target.value) {
      this.props.dispatch(
        removeTask(
          `projects/${this.props.task.ref.parent.parent.id}/tasks/${this.props.task.id}`
        )
      )

      this.setState({ isDeleted: true })

      return
    }

    this.props.dispatch(
      editTask(
        this.props.task.id,
        {
          title: this.state.value,
          project: this.props.task.ref.parent.parent.id
        }
      )
    )
  }

  // Commit a change in completion
  commitDone(e) {
    this.setState({ isDone: e.target.checked || false })
    this.props.dispatch(
      editTask(
        this.props.task.id,
        {
          isDone: e.target.checked || false,
          project: this.props.task.ref.parent.parent.id
        }
      )
    )
  }

  render() {
    console.log('Task recieved props', this.props.task)
    return (
      <div
        className="bg-near-white pv3 ph2 br1 mb2 task"
        style={{
          display: 'grid',
          gridTemplateColumns: '16px auto',
          gridGap: '16px'
        }}
      >
        
        <Checkbox
          defaultChecked={
            this.props.task.data().isDone
          }
          onClick={this.commitDone}
        />

        <p className="ma0 dib">
          <input
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              outline: 'none',
              textDecoration: this.state.isDone ? 'line-through' : '',
              width: '100%'
            }}
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.commitChange} />
        </p>
      </div>
    )
  }
}

export default connect()(Task)