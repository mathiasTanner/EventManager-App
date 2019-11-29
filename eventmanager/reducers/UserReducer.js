import { GET_USER_BY_ID } from "../Types";

export const UserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return action.payload;
    default:
      return state;
  }
};
