import { combineReducers } from "redux";
import employee from "./employee";
import login from "./login";

const rootReducer = combineReducers({
  employee: employee,
  login: login,
});

export default rootReducer;
