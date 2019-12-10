import { GET_EVENTS } from "../Types";

export const EventReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    default:
      return state;
  }
};
