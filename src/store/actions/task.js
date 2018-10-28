import { firestore } from '../../lib/firebase'
import { fetching } from './fetching'

export function getTasks(project) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Getting tasks'))

    firestore.collection(`/projects/${project}/tasks`).onSnapshot(doc => {
      var tasks = []
      doc.forEach(x => tasks.push(x))

      dispatch({
        type: 'GET_TASKS',
        tasks
      })

      dispatch(fetching(false))
    })
  }
}

/**
 * addTask - Add a new task with an auto-generated id
 * @param {Object} task - Task object to add.
 * @param {String} task.title - Title of task (required)
 * @param {String} task.description - Description of task
 * @param {String} task.project - Project's id (required)
 */
export function addTask(task = {}) {
  return async function (dispatch) {
    dispatch(fetching(true, 'Adding task'))

    var response = await firestore.collection(`/projects/${task.project}/tasks`).add(task)

    dispatch({
      type: 'ADD_TASK',
      task: response
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