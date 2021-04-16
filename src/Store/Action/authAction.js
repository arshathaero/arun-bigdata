import * as actionTypes from "./actionTypes";







export const signupStart = () => {
    return {
      type: actionTypes.SIGNUP_START,
    };
  };
  
  export const signupSuccess = (token) => {
    return {
      type: actionTypes.SIGNUP_SUCCESS,
      token: token,
    };
  };
  
  export const signupFail = (err) => {
    return {
      type: actionTypes.SIGNUP_FAIL,
      err: err,
    };
  };
  
  export const signup = (
    first_name,
    last_name,
    email,
    
    password,
    organization,
    form
  ) => {
    return {
      type: actionTypes.SIGNUP,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      organization: organization,
     form:form
    };
  };
  



  
  export const loginStart = () => {
    return {
      type: actionTypes.LOGIN_START,
    };
  };
  
  export const loginSuccess = (token) => {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      token: token,
    };
  };
  
  export const loginFail = (err) => {
    return {
      type: actionTypes.LOGIN_FAIL,
      err: err,
    };
  };
  
  export const login = (email, password) => {
    return {
      type: actionTypes.LOGIN,
  
      email: email,
      password: password,
    };
  };
  
  export const logout = () => {
    return {
      type: actionTypes.LOGOUT,
    };
  };