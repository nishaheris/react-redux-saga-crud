import * as type from "../types";

export const signupStart = (user) => {
  return {
    type: type.SIGNUP_USER_REQUISTED,
    paylod: user,
  };
};
