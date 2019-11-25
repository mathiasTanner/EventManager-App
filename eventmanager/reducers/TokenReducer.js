import { GET_TOKEN } from "../Types";

export const TokenReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
