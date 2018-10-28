/**
 * fetching - Show to the user whether a request to the db is currently happening.
 * @param {Boolean} currentlyFetching - Is the app currently fetching something from firestore?
 * @param {String} message - Message to display to the user
 */
export function fetching(currentlyFetching, message) {
  return {
    type: 'FETCHING',
    currentlyFetching,
    message
  }
}