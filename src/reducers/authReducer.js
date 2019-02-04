import { combineReducers } from 'redux';

const loginReducer = (state = { authError: null }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return { ...state, authError: null };
    case 'LOGIN_FAILURE':
      console.log('login failure');
      return { ...state, authError: action.err.message };
    case 'LOGOUT_SUCCESS':
      console.log('logout success');
      return state;
    default:
      return state;
  }
};

const signupReducer = (state = { authError: null }, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return { ...state, authError: null };
    case 'SIGNUP_FAILURE':
      console.log('signup failure');
      console.log(action.err.message);
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};

const authReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
});

export default authReducer;
