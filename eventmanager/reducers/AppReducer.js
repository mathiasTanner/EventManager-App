import { GET_TOKEN, SHOW_LOADING } from "../Types";

export const AppReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state, token: action.payload };
    case SHOW_LOADING:
      return { ...state, isLoadingVisible: action.payload };
    default:
      return state;
  }
};
