import { takeLatest, takeEvery, all, take } from "redux-saga/effects";
import * as actionTypes from "../Action/actionTypes";
import {
   signupSaga,
   
    loginSaga,

} from "./authSaga";
  

export function* watchAuth() {
    yield all([
      yield takeLatest(actionTypes.SIGNUP, signupSaga),
      

      yield takeLatest(actionTypes.LOGIN, loginSaga),
    ]);
  }