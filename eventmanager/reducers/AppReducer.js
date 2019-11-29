import { GET_TOKEN } from "../Types";

export const AppReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
