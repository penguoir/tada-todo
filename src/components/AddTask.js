import React from 'react'
import Button from '@atlaskit/button'
import { firestore } from '../lib/firebase'

export default () => {
  var project = window.location.pathname.match(/project\/(.*)/)
    ? window.location.pathname.match(/project\/(.*)/)[1]
    : ''
  
  return (
    <div className="mb3 dib">
      <Button
        appearance='subtle'
        onClick={e => {
          firestore.collection('tasks').add({
            title: '',
            project,
            done: false,
            user: require('js-cookie').get('userid')
          })
        }}>
        + Add Task
      </Button>
    </div>
  )
}