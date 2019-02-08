import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'; // syncs firebase data (incld auth status) with state
import { firestoreReducer } from 'redux-firestore'; // syncs firestore data with state
import authReducer from './authReducer';
import newPostReducer from './newPostReducer';
import commentReducer from './commentReducer';
import upvoteReducer from './upvoteReducer';
import filterChipsReducer from './filterChipsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  newPost: newPostReducer,
  comment: commentReducer,
  upvote: upvoteReducer,
  chipFilter: filterChipsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
