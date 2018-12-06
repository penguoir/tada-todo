import React from 'react'
import Button, { ButtonGroup } from '@atlaskit/button'
import FieldText from '@atlaskit/field-text'
import ModalDialog from '@atlaskit/modal-dialog'
import { firestore } from '../lib/firebase'

export default class Actions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editingProject: false, // is modal open?
      formTitle: // state of input in modal
        Object.keys(this.props.project).length  &&
        this.props.project.data().title
    }

    // Bind functions
    this._deleteProject = this._deleteProject.bind(this)
  }

  async _deleteProject() {
    var batch = firestore.batch()

    // Delete current project
    batch.delete( this.props.project.ref )

    // Get tasks in project
    var snapshot = await firestore.collection('tasks')
      .where('user', '==', require('js-cookie').get('userid'))
      .where('project', '==', this.props.project.id)
      .get()

    // Delete each one
    snapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    // Comfirm delete
    batch.commit()

    // Redirect to 'all tasks' page
    window.location.pathname = '/'
  }

  render() {
    // If in 'all tasks' mode, don't render actions.
    if ( window.location.pathname === '/' ) {
      return <></>
    }

    return (
      <>
      <div className="tar dib fr">
        <ButtonGroup>
          <Button onClick={e => {
            this.setState({ editingProject: true })}
          }>
            Edit Project
          </Button>
          <Button appearance="danger" onClick={this._deleteProject}>
            Delete Project
          </Button>
        </ButtonGroup>
      </div>

      { this.state.editingProject && // if editing project, show modal
        <ModalDialog onClose={e => {
          console.log(e)
          // Close when clicking on the "close" button
          this.setState({ editingProject: false })}
        }>
          <form className="pa3">
            <h2 className="mb0">Edit {this.props.project.data().title} </h2>

            <FieldText
              label="Title"
              required
              shouldFitContainer={true}
              placeholder="Grocery List"
              name="title"
              value={this.props.project.data().title}
              onChange={e => { this.setState({ formTitle: e.currentTarget.value })}}
            />

            <div style={{ textAlign: 'right' }} className="mt4">
              <ButtonGroup>
                <Button type="submit" appearance="default" onClick={e => {
                  e.preventDefault()
                  this.setState({ editingProject: false})
                }}>Cancel</Button>
                <Button type="submit" appearance="primary" onClick={e => {
                  e.preventDefault()

                  // Close the modal
                  this.setState({ editingProject: false })

                  firestore.doc(this.props.project.ref.path).update({
                    title: this.state.formTitle
                  })
                }}>Edit Project</Button>
              </ButtonGroup>
            </div>
          </form>
        </ModalDialog>
      }
      </>
    )
  }
}