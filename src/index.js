import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

// Pages
import App from './pages/App';
import Join from './pages/Join';

// Store
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import todo from './store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

// Initialise store
const store = createStore(
  todo, // reducer
  composeWithDevTools(
    applyMiddleware(thunk) // add capability for async actions
  )
)

// Routes
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <>
        <Route exact path="/join" component={Join} />
        <Route exact path="/app" component={App} />
      </>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// TODO: change to register()
serviceWorker.unregister();
