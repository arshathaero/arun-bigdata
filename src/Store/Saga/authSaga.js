import * as actions from "../Action/index";
import React from "react";
import axios from "../../axios";
import { put, delay, call } from "redux-saga/effects";


export function* signupSaga(action) {
    yield put(actions.signupStart());
  
    const registerData = new FormData();
    registerData.append('first_name', action.first_name)
    registerData.append('last_name',action.last_name)

    registerData.append('email',action.email)

    registerData.append('password',action.password)
    
    registerData.append('confirm_password',action.password)
    registerData.append('organization', action.organization)
    
  console.log(registerData)
    try {
      const response = yield axios.post('/accounts/signup/', registerData);
      action.form()

      yield put(actions.signupSuccess(response.data));
    } catch (error) {
      console.log(error.response);
      let err = error.response.data;
      yield put(actions.signupFail(err));
      // yield delay(3000);
      // yield put(actions.signupFail(null));
    }
}
  


export function* loginSaga(action) {
    yield put(actions.loginStart());
    let data = {
      email: action.email,
      password: action.password,
    };
  
    try {
      const response = yield axios.post("/accounts/login/token/", data);
      let loginToken = response.data;
  
      yield call([localStorage, "setItem"], "token", loginToken.access);

      // window.location.href = '/'
  
      yield put(actions.loginSuccess(loginToken));
    } catch (error) {
      console.log(error.response);
      let err = error.response.data;
  
      yield put(actions.loginFail(err));
     
    }
  }