import { combineReducers } from "redux";
import employee from "./employee";
import login from "./login";
import userprofile from "./userprofile";
import products from "./products";

const rootReducer = combineReducers({
  employee: employee,
  login: login,
  userprofile: userprofile,
  products: products,
});

export default rootReducer;
