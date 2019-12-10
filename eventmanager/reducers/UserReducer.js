import { GET_USER_BY_ID, REGISTER_USER } from "../Types";

export const UserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
};
