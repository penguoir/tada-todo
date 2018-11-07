import React from 'react'
import Project from './Project'
import ModalDialog from '@atlaskit/modal-dialog'
import Button, { ButtonGroup } from '@atlaskit/button'
import { Link } from 'react-router-dom'
import FieldText from '@atlaskit/field-text'
import { firestore } from '../lib/firebase'

var userid = require('js-cookie').get('userid')

export default class HelloMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { projects: [], creatingProject: false, formTitle: '' }
  }

  componentDidMount() {
    // Get user's projects, set state
    firestore.collection('projects')
      .where('user', '==', userid)
      .onSnapshot(snapshot => {
        var projects = []
        snapshot.forEach(x => { projects.push(x) })
        this.setState({ projects })
      })
  }

  render() {
    return (
      <>
        <div className="mt3">
          <Link to='/' className="i pa3 mb2 bg-near-white db no-underline black">
            All Tasks
          </Link>

          { this.state.projects.map(x =>
            <Project key={x.id} project={x} />
          ) }
          
          <p>
            <Button appearance='subtle' onClick={e => {
              this.setState({ creatingProject: true })
            }}>
              + Add Project
            </Button>
          </p>
        </div>

        {/* Modal for adding new project */}
        { this.state.creatingProject && 
          <ModalDialog onClose={e => { this.setState({ creatingProject: false })}}>
            <form className="pa3">
              <h2 className="mb0">Create a new project</h2>

              <FieldText
                label="Title"
                required
                shouldFitContainer={true}
                placeholder="Grocery List"
                name="title"
                value={this.state.formTitle}
                onChange={e => { this.setState({ formTitle: e.currentTarget.value })}}
              />

              <div style={{ textAlign: 'right' }} className="mt4">
                <ButtonGroup>
                  <Button type="submit" appearance="default" onClick={e => {
                    this.setState({ creatingProject: false })
                  }}>Cancel</Button>
                  <Button type="submit" appearance="primary" onClick={e => {
                    e.preventDefault()

                    // Close the modal
                    this.setState({ creatingProject: false })

                    // Add the new project with data from the form
                    firestore.collection('projects').add({
                      title: this.state.formTitle,
                      user: require('js-cookie').get('userid')
                    })
                  }}>Add Project</Button>
                </ButtonGroup>
              </div>
            </form>
          </ModalDialog>
        }
      </>
    )
  }
}