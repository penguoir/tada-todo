import { combineReducers } from 'redux'

// TODO: add refreshProject action
// TODO: listen to firestore for changes

/**
 * project reducer
 * @param {Object} action 
 * @param {String} action.project - Firebase snapshot to change current project to
 */
var project = function(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_PROJECT':
      return action.project
    default:
      return state
  }
}

// Tasks
var tasks = function(state = [], action) {
  switch (action.type) {
    case 'GET_TASKS':
      return action.tasks
    default:
      return state
  }
}

// Projects
var projects = function(state = [], action) {
  switch (action.type) {
    case 'GET_PROJECTS':
      return action.projects
    default:
      return state
  }
}

var fetching = function(state = {}, action) {
  if (action.type === 'FETCHING') {
    return Object.assign({}, state, {
      currentlyFetching: action.currentlyFetching,
      message: action.message
    })
  } else {
    return state
  }
}

const todo = combineReducers({
  project,
  tasks,
  projects,
  fetching
})

export default todo