import * as type from "../types";

export function getUserProfile(userProfile) {
  return {
    type: type.GET_USER_PROFILE_REQUESTED,
    payload: userProfile,
  };
}
