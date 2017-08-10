import axios from "axios";
import { browserHistory } from "react-router";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from "./types";

const ROOT_URL = "http://127.0.0.1:5000";

export function signinUser({ email, password }) {
  //with redux-thunk we now return a function
  return function(dispatch) {
    // w/redux we can dispatch our own actions any time we want
    //submit email/pass to server <-our api server
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // if response then is good then...
        // - update state to inidicate user is autehd
        dispatch({ type: AUTH_USER });
        // - save jwt token
        localStorage.setItem("token", response.data.token);
        // - redirect to logged in route
        browserHistory.push("/feature");
      }) //end then
      .catch(() => {
        // if request is bad ...
        // - show err to user
        dispatch(authError("Bad Login Info"));
      }); //end catch
  }; //end return function
} //end export

export function signupUser({ email, password }) {
  //with redux-thunk we now return a function
  return function(dispatch) {
    // w/redux we can dispatch our own actions any time we want
    //submit email/pass to server <-our api server
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER }); // - update state to inidicate user is autehd
        localStorage.setItem("token", response.data.token); // - save jwt token
        browserHistory.push("/feature"); // - redirect to logged in route
      }) //end then
      .catch(error => dispatch(authError(error.response.data.error))); // - show err to user
  }; //end return function
} //end export

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem("token");

  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(ROOT_URL, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
