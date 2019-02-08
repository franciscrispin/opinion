import { combineReducers } from 'redux';

const loginReducer = (state = { authError: null }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, authError: null };
    case 'LOGIN_FAILURE':
      return { ...state, authError: action.err.message };
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};

const signupReducer = (state = { authError: null }, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, authError: null };
    case 'SIGNUP_FAILURE':
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
