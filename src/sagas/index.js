import { all } from "redux-saga/effects";
import employeeSaga from "./employeeSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga() {
  //Running Tasks In Parallel
  yield all([employeeSaga(), loginSaga()]);
}
