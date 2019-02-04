import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'; // syncs firebase data (incld auth status) with state
import { firestoreReducer } from 'redux-firestore'; // syncs firestore data with state
import authReducer from './authReducer';
import newPostReducer from './newPostReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  newPost: newPostReducer,
  comment: commentReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
