import { combineReducers } from "redux";
import employee from "./employee";
import login from "./login";
import userprofile from "./userprofile";

const rootReducer = combineReducers({
  employee: employee,
  login: login,
  userprofile: userprofile,
});

export default rootReducer;
