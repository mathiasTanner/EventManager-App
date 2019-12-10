import {
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  REGISTER_USER,
  SET_USERNAME
} from "../Types";

export const UserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return action.payload;
    case GET_USER_BY_USERNAME:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    case SET_USERNAME:
      return action.payload;
    default:
      return state;
  }
};
