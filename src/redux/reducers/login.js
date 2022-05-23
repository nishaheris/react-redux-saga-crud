import * as type from "../types";

const initialState = {
  user: [],
  loading: false,
  error: null,
  isLogin: false,
};

function login(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_USER_REQUISTED:
      return {
        ...state,
        loading: true,
        isLogin: false,
        error: action.message,
      };
    case type.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogin: true,
        user: action.user,
      };

    case type.LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        isLogin: false,
        error: action.message,
      };
    case type.LOGOUT_USER_REQUISTED:
      return {
        ...state,
        loading: true,
      };
    case type.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogin: false,
      };
    default:
      return state;
  }
}

export default login;
