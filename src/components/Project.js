import React from 'react'
import { Link } from 'react-router-dom'

function Project({ project }) {
  
  return (
    <Link to={'/project/' + project.id} className={
      "pa3 mb2 db no-underline bg-near-white black"
    }>
      { project.data().title }
    </Link>
  )
}

export default Project