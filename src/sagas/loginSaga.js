import { call, put, takeLatest } from "redux-saga/effects";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase-config";

function loginFirebaseApi(email, password) {
  const authentication = getAuth();
  return signInWithEmailAndPassword(authentication, email, password);
}

function* fetchLoginUser(user) {
  try {
    const response = yield call(
      loginFirebaseApi,
      user.payload.email,
      user.payload.password
    );

    const token = response._tokenResponse.refreshToken;
    if (token) {
      yield put({ type: "LOGIN_USER_SUCCESS", user: user });
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      const msg = "User Not Found";
      yield put({ type: "LOGIN_USER_FAILED", message: msg });
    }
    if (error.code === "auth/wrong-password") {
      const msg = "Please check your Password";
      yield put({ type: "LOGIN_USER_FAILED", message: msg });
    }
  }
}

/******************************** Login through Normal API call code ********************************/
//Set URL from where get the data
//const apiUrl = "https://reqres.in/api/login";

// function getApi(user) {
//   return fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       throw error;
//     });
// }

//function* fetchLoginUser(user) {
//try {
//   const userData = yield call(getApi,  user.payload);
//      if (userData.token) {
//        yield put({ type: "LOGIN_USER_SUCCESS", user: userData });
//      } else {
//        yield put({ type: "LOGIN_USER_FAILED", message: userData.error });
//      }
//  } catch (e) {
//      yield put({ type: "LOGIN_USER_FAILED", message: e.message });
//    }
//}

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
