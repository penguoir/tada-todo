import React from 'react'
import { Link } from 'react-router-dom'

function Project({ project }) {
  var match = window.location.pathname.match(/project\/(.*)/)
  var isCurrentProject = false

  // If this project's id == id in url, set isCurrentProject to true
  if (match && match[1] === project.id) {
    isCurrentProject = true
  }
  
  return (
    <Link to={'/project/' + project.id} className={
      "pa3 mb2 db no-underline " +
      ( isCurrentProject // change classes based on if this is the current project
        ? 'bg-blue white'
        : 'bg-near-white black' )
    }>
      { project.data().title }
    </Link>
  )
}

export default Project