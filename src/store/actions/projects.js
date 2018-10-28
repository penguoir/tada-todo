import { firestore } from '../../lib/firebase'
import { fetching } from './fetching'

const userid = require('js-cookie').get('userid')

export function getProjects() {
  return async function (dispatch) {
    dispatch(fetching(true, 'Getting projects'))

    // FIXME: change 'ori' to current user
    firestore.collection(`/projects`).where('user', '==', 'ori').onSnapshot(doc => {
      var projects = []
      doc.forEach(x => projects.push(x))

      dispatch({
        type: 'GET_PROJECTS',
        projects
      })

      dispatch(fetching(false))
    })
  }
}

export function addProject(project = {}) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Adding project'))

    var response = await firestore.collection(`/projects`).add(project)

    dispatch({
      type: 'ADD_PROJECT',
      project: response
    })

    dispatch(fetching(false))
  }
}

/**
 * @param {String} id - id of the task to edit
 * @param {Object} task - Changes in task object to merge into existing one
 * @param {String} task.title - Title of task
 * @param {String} task.description - Description of task
 * @param {String} task.project - Project's id
 */
export function editTask(id, task) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Editing task'))

    var response = await firestore.doc(`/projects/${task.project}/tasks/${id}`).update(task)
    
    dispatch({
      type: 'EDIT_TASK',
      id,
      task: response
    })
    
    dispatch(fetching(false))
  }
}

/**
 * @param {String} path - path to task that needs to be removed
 */
export function removeTask(path) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Removing task'))
    
    var response = await firestore.doc(path).delete()

    dispatch({
      type: 'REMOVE_TASK',
      task: response
    })

    dispatch(fetching(false))
  }
}