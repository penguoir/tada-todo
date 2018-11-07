import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route } from 'react-router-dom'

// Pages
import App from './pages/App'
import Join from './pages/Join'

ReactDOM.render((
  <BrowserRouter>
    <>
      <Route exact path="/-/join" component={Join} />
      <Route exact path="/" component={App} />
      <Route path="/project" render={props => (
        <App location={props.location} />
      )} />
    </>
  </BrowserRouter>
), document.getElementById('root'))

// TODO: change to register()
serviceWorker.unregister()
