import React from 'react'
import { Checkbox } from '@atlaskit/checkbox'
import { firestore } from '../lib/firebase'

class Task extends React.Component {
  constructor(props) {
    super(props)
    
    // Initial data from props -> state
    this.state = {
      title: this.props.task.data().title,
      done: this.props.task.data().done, 
      project: ''
    }

    // Bind functions
    this.handleChange = this.handleChange.bind(this)
    this.commitChange = this.commitChange.bind(this)
    this.commitDone = this.commitDone.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  // When changing title, auto-update it in state
  handleChange(e) {
    this.setState({ title: e.target.value })
  }

  handleKeyDown(e) {
    // When pressing enter in a task, create a new task
    if (e.which === 13) {
      firestore.collection('tasks').add({
        title: '',
        project: this.props.task.data().project,
        user: require('js-cookie').get('userid')
      })
    }

    // When pressing delete when the title is empty, delete the task
    if (e.which === 8 && !e.target.value) {
      firestore.doc( this.props.task.ref.path ).delete()
    }
  }

  // Commit a change to the task
  commitChange(e) {
    var ref = this.props.task.ref.path
    // Delete when no content
    if (!e.target.value) {
      return firestore.doc( ref ).delete()
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
    // This also happens when creating a task. Curosr goes into it
    if (this.titleInput) {
      this.titleInput.focus()
    }

    if (this.props.task.data().project) {
      // Set project to one gotten from project
      firestore.doc('projects/' + this.props.task.data().project).get().then(doc => {
        this.setState({ project: doc.data().title })
      })
    }
  }

  render() {
    return (
      <div
        className="bg-near-white pv3 ph2 br1 mb2 task"
        style={{
          display: 'grid',
          gridTemplateColumns: '16px auto',
          gridGap: '8px'
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
          
          {
            // Show project if in all tasks mode
            this.props.isAllTasks &&
            <small className="mv0 w5">{ this.state.project }</small>
          }
        </div>
      </div>
    )
  }
}

export default Task