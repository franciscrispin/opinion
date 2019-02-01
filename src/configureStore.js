import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import rootReducer from './reducers/index';
import firebase from './config/fbConfig';

const configureStore = () => {
  const enhancer = compose(
    // store enhancers
    applyMiddleware(thunk.withExtraArgument(getFirestore)),
    reduxFirestore(firebase) // redux bindings for firestore
  );

  return createStore(rootReducer, enhancer);
};

export default configureStore;
