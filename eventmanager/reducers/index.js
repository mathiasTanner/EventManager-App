import { combineReducers } from "redux";
import { AppReducer } from "./AppReducer";
import { UserReducer } from "./UserReducer";
import { EventReducer } from "./EventReducer";

export default combineReducers({
  app: AppReducer,
  events: EventReducer,
  user: UserReducer
});
