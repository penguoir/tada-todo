import React from 'react'
import Button from '@atlaskit/button'
import newTask from '../lib/newTask'

export default () => {
  var project = window.location.pathname.match(/project\/(.*)/)
    ? window.location.pathname.match(/project\/(.*)/)[1]
    : ''
  
  return (
    <div className="mb3 dib">
      <Button
        appearance='subtle'
        onClick={e => {
          newTask({ project }) 
        }}>
        + Add Task
      </Button>
    </div>
  )
}