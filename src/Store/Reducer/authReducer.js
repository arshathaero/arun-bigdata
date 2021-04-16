import * as actionTypes from "../Action/actionTypes";
const initialState = {
  error: null,
  loading: false,
  token: null,
  signupData:null
};

const signupStart = (state, action) => {
  return { ...state, error: null, signupData: null, loading: true };
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    signupData: action.token,
  };
};

const signupFail = (state, action) => {
  return { ...state, error: action.err, loading: false,signupData:null };
};

const loginStart = (state, action) => {
  return { ...state, loading: true,error:null,token:null };
};

const loginSuccess = (state, action) => {
  return { ...state, token: action.token, loading: false,error:null};
};

const loginFail = (state, action) => {
  return { ...state, error: action.err, loading: false };
};


const logout = (state, action) => {
  localStorage.removeItem("token");
  localStorage.removeItem("firstname");

  return { ...state, logintToken: null, loggedIn: false };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signupFail(state, action);

    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);

  

    case actionTypes.LOGOUT:
      return logout(state, action);

   

    default:
      return state;
  }
};

export default authReducer;