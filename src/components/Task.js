import React from 'react'
import { Checkbox } from '@atlaskit/checkbox'
import { firestore } from '../lib/firebase'
import newTask from '../lib/newTask'

class Task extends React.Component {
  constructor(props) {
    super(props)
    
    // Initial data from props -> state
    this.state = {
      title: this.props.task.data().title,
      done: this.props.task.data().done, 
      project: '',
      deleted: false
    }

    // Bind functions
    this.handleChange = this.handleChange.bind(this)
    this.commitChange = this.commitChange.bind(this)
    this.commitDone = this.commitDone.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  _deleteSelf = () => {
    firestore.doc( this.props.task.ref.path ).delete() // delete in database
    this.setState({ deleted: true }) // turn transparent slowly
    this.props.update() // tell parent to refresh
  }

  // When changing title, update it in state
  handleChange(e) {
    this.setState({ title: e.target.value })
  }

  async handleKeyDown(e) {
    e.persist()
    
    // When pressing enter in a task, create a new task
    if (e.which === 13) {
      await newTask({ project: this.props.task.data().project })
      this.props.update()
    }

    // When pressing delete when the title is empty, delete the task
    if (e.which === 8 && !e.target.value) {
      return this._deleteSelf()
    }
  }

  // Commit a change to the task
  commitChange(e) {
    var ref = this.props.task.ref.path
    // Delete when no content
    if (!e.target.value) {
      return this._deleteSelf()
    }

    // Otherwise, edit the content
    return firestore.doc( ref ).update({ title: this.state.title })
  }

  // Commit a change in completion
  commitDone(e) {
    var ref = this.props.task.ref.path
    this.setState({ done: e.target.checked || false })
    return firestore.doc( ref ).update({ done: e.target.checked || false })
  }

  componentDidMount() {
    // Focus on last task in list automatically
    // This also happens when creating a task (cursor goes into it)
    if (this.titleInput) {
      this.titleInput.focus()
    }
  }

  render() {
    return (
      <div
        className="bg-near-white pv3 ph2 br1 mb2 task"
        style={{
          display: 'grid',
          gridTemplateColumns: '16px auto',
          gridGap: '8px',
          opacity: this.state.deleted ? '0.3' : '1',
          transition: 'opacity .2s ease'
        }}
      >
        
        <Checkbox
          defaultChecked={
            this.props.task.data().done
          }
          onClick={this.commitDone}
        />

        <div>
          <input
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              lineHeight: '1.5',
              textDecoration: this.state.done ? 'line-through' : '',
            }}
            value={this.state.title}
            onChange={this.handleChange}
            onBlur={this.commitChange}
            ref={(input) => { this.titleInput = input }}
            onKeyDown={this.handleKeyDown}  />
        </div>
      </div>
    )
  }
}

export default Task