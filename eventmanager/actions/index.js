import axios from "axios";
import {
  GET_TOKEN,
  REGISTER_USER,
  SHOW_LOADING,
  GET_USER_BY_USERNAME
} from "../Types";
import { login, register, userByUsername } from "../urls/ApiUrls";
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
        console.log(data);
        dispatch(connection(data));
        if (data !== "no token found") {
          fetchUser(username, data);
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
export const fetchUser = (username, token) => {
  let authConfig = {
    headers: { Authorization: "bearer " + token }
  };
  console.log(userByUsername + username);

  return axios
    .post(userByUsername + username, null, authConfig)
    .then(response => response.data)
    .then(data => {
      console.log(data);
      dispatch(getUser(data));
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message, error);
    });
};

const getUser = data => {
  return {
    type: GET_USER_BY_USERNAME,
    payload: data
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
