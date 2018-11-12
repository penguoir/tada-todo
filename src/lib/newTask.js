import { firestore } from './firebase'

/**
 * 
 * @param {Object} task - Task object to create
 * @param {String} task.title - Title of the task
 * @param {String} task.project - Project of the task
 * @param {Boolean} task.done - Is the task completed?
 * @param {String} task.user - userid (default is in cookie)
 */
export default function newTask(task) {
  firestore.collection('tasks').add({
    title: task.title || '',
    project: task.project || null,
    done: task.done || false,
    user: task.user || require('js-cookie').get('userid'),
    timestamp: new Date() // this is a TEMPORARY solution to ordering tasks and should be changed once manually changing task order is implemented.
  })
}