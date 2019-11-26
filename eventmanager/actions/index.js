import axios from "axios";
import { GET_TOKEN } from "../Types";
import { login } from "../urls/ApiUrls";
import * as qs from "query-string";

//to fetch the token of a registered user
export const fetchToken = (username, passwordHash) => {
  const config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  const requestBody = {
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
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message, error);
      });
  };
};

export const connection = data => {
  return {
    type: GET_TOKEN,
    payload: data
  };
};
