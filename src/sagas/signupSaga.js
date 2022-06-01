import { call, put, takeLatest } from "redux-saga/effects";

function* insertUserForSignup(user) {
  try {
    yield put({ type: "SIGNUP_USER_SUCCESS", user: user.paylod });
  } catch (e) {
    yield put({ type: "LOGIN_USER_FAILED", message: e.message });
  }
}

// call above function in saga function
function* signupSaga() {
  yield takeLatest("SIGNUP_USER_REQUISTED", insertUserForSignup);
}

export default signupSaga;
