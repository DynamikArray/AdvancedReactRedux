import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Homepage from './components/homepage';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';

import {AUTH_USER} from './actions/types'
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

//Check if we already have a token
const token = localStorage.getItem('token');
if(token){
  //update app state using auth_user action
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Homepage}/>

        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />

        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container-fluid'));
