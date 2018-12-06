import React from 'react'
import { firestore } from '../lib/firebase'

import Project from './Project'

var userid = require('js-cookie').get('userid')

export default class HelloMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  async componentDidMount() {
    var data
    
    try {
      data = await firestore
        .collection('projects')
        .where('user', '==', userid)
        .get()
    } catch (e) {
      throw e
    }
    console.log(data.data().projects)
    this.setState({ projects: data.data().projects })
  }

  render() {
    return (
      <div>
        { this.state.projects.map(project => <Project project={project} />)}
      </div>
    )
  }
}