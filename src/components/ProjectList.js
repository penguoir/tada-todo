import React from 'react'
import { connect } from 'react-redux'

import Project from './Project'
import AddProject from './AddProject'

class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { addingTask: false }
  }

  render() {
    return (
      <div>
        { this.props.projects && this.props.projects.length && this.props.projects.map(x => {
          console.log(x.id, this.props.project.id)
          return x.id === this.props.project.id
          ? <Project project={x} active />
          : <Project project={x} />
        }
        )}

        {/* <div className="db cf mt3">
          <AddProject />
        </div> */}
      </div>
    )
  }
}

export default connect(state => ({
  projects: state.projects,
  project: state.project
}))(ProjectList)