import { firestore } from '../../lib/firebase'
import { fetching } from './fetching'
import { getTasks } from './task'

/**
 * changeProject - change current project to a different one
 * @param {String} project - Project id
 */
export function changeProject(projectId) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Getting project'))
    dispatch(getTasks(projectId))
    var project = await firestore.doc(`/projects/${projectId}`).get()

    dispatch({
      type: 'CHANGE_PROJECT',
      project, // actual firestore object
    })

    dispatch(fetching(false))
  }
}

/**
 * refreshProject - re-get fresh tasks from firebase
 * @param {String} project - Project id
 */
export function refreshProject(project) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Refreshing project'))

    var response = await firestore.collection(`/projects/${project}/tasks`).get()
    
    var tasks = []
    response.forEach(x => tasks.push(x))

    dispatch({
      type: 'CHANGE_PROJECT',
      tasks
    })

    dispatch(fetching(false))
  }
}