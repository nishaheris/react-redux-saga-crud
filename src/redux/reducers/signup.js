import * as type from "../types";

const initialState = {
  user: [],
  loading: false,
  error: null,
  signup: [],
};

function signup(state = initialState, action) {
  switch (action.type) {
    case type.SIGNUP_USER_REQUISTED:
      return {
        ...state,
        loading: true,
      };
    case type.SIGNUP_USER_SUCCESS:
      let existData = localStorage.getItem("signupUserData");

      if (!existData) {
        let localData = {
          firstname: action.user.firstname,
          lastname: action.user.lastname,
          email: action.user.email,
        };
        state.signup.push(localData);
        localStorage.setItem("signupUserData", JSON.stringify(state.signup));
      }

      return {
        ...state,
        loading: false,
        user: action.user,
      };

    case type.SIGNUP_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}

export default signup;
