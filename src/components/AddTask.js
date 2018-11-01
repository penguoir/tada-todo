import React from 'react'
import Button from '@atlaskit/button'
import { firestore } from '../lib/firebase'

export default () => (
  <p style={{ float: 'right' }}>
    <Button
      appearance='primary'
      onClick={e => {
        firestore.collection('tasks').add({
          title: '',
          done: false,
          user: require('js-cookie').get('userid')
        })
      }}>
      + Add Task
    </Button>
  </p>
)