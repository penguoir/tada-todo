import React from 'react'
import { connect } from 'react-redux'
import { changeProject } from '../store/actions/project'

function Project({ project, active, dispatch }){
  return (
    <div
      className={(active ? ' bg-blue white' : '') + " pa3 mb2 bg-near-white db" }
      onClick={e => { dispatch(changeProject(project.id))}}
      >
      {project.data().title}
    </div>
  )
}

export default connect()(Project)