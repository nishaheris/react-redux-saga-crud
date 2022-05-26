import { call, put, takeLatest, delay } from "redux-saga/effects";
import { loadUserPrfile } from "../api/api";

function* fetchUserProfile(action) {
  try {
    const response = yield call(loadUserPrfile);

    if (response.status === 200) {
      yield delay(500);
      yield put({
        type: "GET_USER_PROFILE_SUCCESS",
        userprofile: response.data,
      });
    }
  } catch (e) {
    yield put({ type: "GET_USER_PROFILE_FAILED", message: e.message });
  }
}

function* userprofileSaga() {
  yield takeLatest("GET_USER_PROFILE_REQUESTED", fetchUserProfile);
}

export default userprofileSaga;
