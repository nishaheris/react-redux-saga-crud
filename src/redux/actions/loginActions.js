import * as type from "../types";

export function loginUser(user) {
  return {
    type: type.LOGIN_USER_REQUISTED,
    payload: user,
  };
}

export function logOutUser() {
  return {
    type: type.LOGOUT_USER_REQUISTED,
  };
}
