import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'; // syncs firebase data (incld auth status) with state
import { firestoreReducer } from 'redux-firestore'; // syncs firestore data with state
import authReducer from './authReducer';
import newPostReducer from './newPostReducer';
import { upvoteReducer, fetchUpvotesReducer } from './postActionsReducer';
import commentReducer from './commentReducer';
import filterChipsReducer from './filterChipsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  newPost: newPostReducer,
  comment: commentReducer,
  upvote: upvoteReducer,
  upvotes: fetchUpvotesReducer,
  chipFilter: filterChipsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
