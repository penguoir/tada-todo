import React from 'react'
import { connect } from 'react-redux'

/*
 Title Bar
-----------
Contains:
 - Current project title
 - Fetching message (getting project, adding task, etc.)

TODO: add menu items for project settings
TODO: check if changes are actually saved
*/

function TitleBar({ project, fetching }) {
  return (
    <div className="db flex justify-end items-center mb4">
      <h1 className="dib ma0 mr-auto">
        {Object.keys(project)[0] ? project.data().title : '...'}
      </h1>
      <small className="fr v-mid mr3">
        {fetching.message ? fetching.message : 'all changes saved'}
      </small>
      <i>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/220px-Hamburger_icon.svg.png" height="16px" width="16px" alt="menu" />
      </i>
    </div>
  )
}

export default connect(state => ({
  project: state.project,
  fetching: state.fetching
}))(TitleBar)