import React from 'react'
import Button from '@atlaskit/button'
import newTask from '../lib/newTask'

export default ({ currentProjectId }) => {
  return (
    <div className="mb3 dib">
      <Button
        appearance='subtle'
        onClick={e => {
          newTask({ project: currentProjectId })
        }}>
        + Add Task
      </Button>
    </div>
  )
}