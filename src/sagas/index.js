import { all } from "redux-saga/effects";
import employeeSaga from "./employeeSaga";
import loginSaga from "./loginSaga";
import userprofileSaga from "./userprofileSaga";

export default function* rootSaga() {
  //Running Tasks In Parallel
  yield all([employeeSaga(), loginSaga(), userprofileSaga()]);
}
