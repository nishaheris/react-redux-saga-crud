import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//Set URL from where get the data
const apiUrl = "https://reqres.in/api/login";

function getApi(user) {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchLoginUser(user) {
  try {
    const userData = yield call(getApi, user.payload);
    if (userData.token) {
      yield put({ type: "LOGIN_USER_SUCCESS", user: userData });
    } else {
      let message = "User Not Found";
      yield put({ type: "LOGIN_USER_FAILED", message: message });
    }
  } catch (e) {
    yield put({ type: "LOGIN_USER_FAILED", message: e.message });
  }
}

function* logoutUser() {
  try {
    yield put({ type: "LOGOUT_USER_SUCCESS" });
  } catch (e) {
    yield put({ type: "LOGIN_USER_FAILED", message: e.message });
  }
}

// call above function in saga function
function* loginSaga() {
  yield takeLatest("LOGIN_USER_REQUISTED", fetchLoginUser);
  yield takeLatest("LOGOUT_USER_REQUISTED", logoutUser);
}

export default loginSaga;
