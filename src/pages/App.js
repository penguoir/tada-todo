import React from 'react'
import { firestore } from '../lib/firebase'

import Task from '../components/Task'
import AddTask from '../components/AddTask'

var userid = require('js-cookie').get('userid')

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state ={ tasks: [] }
  }

  componentWillMount() {
    if (!userid) window.location = '/-/join'

    firestore.collection('tasks').where('user', '==', userid)
      .onSnapshot(doc => {
        var tasks = []
        doc.forEach(x => tasks.push(x))
        this.setState({ tasks })
      })
  }

  render() {
    console.log(this.state.tasks)
    return (
      <div style={{
        width: '90vw',
        maxWidth: '900px',
        margin: '5em auto',
      }}>
        <h1>Tasks</h1>
        <AddTask />
        <div>
          {this.state.tasks.map(x => <Task key={x.id} task={x} />)}
        </div>
      </div>
    )
  }
}

export default Index
