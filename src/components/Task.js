import React from 'react'
import { Checkbox } from '@atlaskit/checkbox'
import { firestore } from '../lib/firebase'

class Task extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      title: this.props.task.data().title,
      done: this.props.task.data().done
    }

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
    if (e.which === 13) {
      firestore.collection('tasks').add({
        title: '',
        user: require('js-cookie').get('userid')
      })
    }

    if (e.which === 8 && !e.target.value) {
      this.props.task.ref.delete()
    }
  }

  // Commit a change to the task
  commitChange(e) {
    // Delete when no content
    if (!e.target.value) {
      return this.props.task.ref.delete()
    }

    // Otherwise, edit the content
    return this.props.task.ref.update({ title: this.state.title })
  }

  // Commit a change in completion
  commitDone(e) {
    this.setState({ done: e.target.checked || false })
    return this.props.task.ref.update({ done: e.target.checked || false })
  }

  componentDidMount() {
    this.titleInput.focus()
  }

  render() {
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
            this.props.task.data().done
          }
          onClick={this.commitDone}
        />

        <p className="ma0 dib">
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
        </p>
      </div>
    )
  }
}

export default Task