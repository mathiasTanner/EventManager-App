import axios from "axios";
import {
  GET_TOKEN,
  REGISTER_USER,
  SHOW_LOADING,
  GET_USER_BY_USERNAME,
  GET_EVENTS,
  SET_USERNAME
} from "../Types";
import { login, register, userByUsername, events } from "../urls/ApiUrls";
import * as qs from "query-string";

const config = {
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
};

//to fetch the token of a registered user
export const fetchToken = (username, passwordHash) => {
  let requestBody = {
    username: username,
    passwordHash: passwordHash
  };

  return dispatch => {
    return axios
      .post(login, qs.stringify(requestBody), config)
      .then(response => response.data)
      .then(data => {
        dispatch(connection(data));
        if (data !== "no token found") {
          dispatch(setUsername(username));
        }
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message, error);
      });
  };
};

const connection = data => {
  return {
    type: GET_TOKEN,
    payload: data
  };
};

//Get a user by username
export const fetchUser = (token, username) => {
  let authConfig = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return dispatch => {
    return axios
      .get(userByUsername + username, authConfig)
      .then(response => response.data)
      .then(data => {
        data.token = token;
        dispatch(getUser(data));
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message, error);
      });
  };
};

const getUser = data => {
  return {
    type: GET_USER_BY_USERNAME,
    payload: data
  };
};

//Set Username
export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: { username: username, passwordHash: null }
  };
};

//To Register a new user

export const createUser = (username, passwordHash, mail, hasCar) => {
  let requestBody = {
    username: username,
    passwordHash: passwordHash,
    mail: mail,
    hasCar: hasCar
  };

  return dispatch => {
    return axios
      .post(register, qs.stringify(requestBody), config)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        dispatch(connection(data.token));
        dispatch(registration(data));
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message, error);
      });
  };
};

const registration = data => {
  return {
    type: REGISTER_USER,
    payload: data
  };
};

// Show the load screen

export const showLoad = isVisible => {
  return {
    type: SHOW_LOADING,
    payload: isVisible
  };
};

//Get the events
export const fetchEvents = token => {
  let authConfig = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  return dispatch => {
    return axios
      .get(events, authConfig)
      .then(response => response.data)
      .then(data => {
        dispatch(getEvents(data._embedded));
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message, error);
      });
  };
};

export const getEvents = data => {
  return {
    type: GET_EVENTS,
    payload: data
  };
};
