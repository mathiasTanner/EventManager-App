import axios from "axios";
import { GET_TOKEN } from "../Types";
import { login } from "../urls/ApiUrls";

//to fetch the token of a registered user
export const fetchToken = (username, passwordHash) => {
  return dispatch => {
    return axios
      .post(login, {
        username: username,
        passwordHash: passwordHash
      })
      .then(response => response.data)
      .then(data => {
        dispatch(connect(data));
      })
      .catch(error => {
        alert("error", error);
      });
  };
};

/* export const fetchToken = (username, passwordHash) => {
  return (action = dispatch => {
    dispatch({ type: GET_TOKEN });

    const request = axio.post(login, {
      username: username,
      passwordHash: passwordHash
    });

    return request
      .then(response => response.data)
      .then(data => {
        dispatch(connect(data));
      })
      .catch(error => {
        alert("error", error);
      });
  });
}; */

export const connect = data => {
  return {
    type: GET_TOKEN,
    payload: data
  };
};
