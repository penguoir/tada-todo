import React from 'react'
import { connect } from 'react-redux'

import Button from './Button'

import { addTask } from '../store/actions/task'

function AddTask({ dispatch, project }) {
  return (
    <Button onClick={e => {
      dispatch(addTask({
        title: 'new task',
        project: project.id
      }))
    }} appearance="primary" className="fr">+ Add Task</Button>
  )
}

export default connect(state => ({ project: state.project }))(AddTask)
