import React from 'react'
import { firestore } from '../lib/firebase'

export default class Title extends React.Component {
  state = {
    title: ''
  }

  async componentDidMount() {
    var title

    try {
      // Get project obj
      var data = await firestore
        .doc(`projects/${this.props.currentProjectId}`)
        .get()

      title = data.data().title
    } catch (e) {
      title = ''
    }

    // Update state to be the current title
    this.setState({ title })
  }

  render() {
    return (
      <h1>
        {this.state.title}
      </h1>
    )
  }
}
