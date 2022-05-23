import * as type from "../types";

const initialState = {
  userprofile: [],
  loading: false,
  error: null,
};
function userprofile(state = initialState, action) {
  switch (action.type) {
    case type.GET_USER_PROFILE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userprofile: action.userprofile,
      };
    case type.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default userprofile;
