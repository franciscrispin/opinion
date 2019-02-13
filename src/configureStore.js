import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
// import { createLogger } from 'redux-logger';
import rootReducer from './reducers/index';
import firebase from './config/fbConfig';

const configureStore = () => {
  const middlewares = [thunk.withExtraArgument(getFirestore)];

  // if (process.env.NODE_ENV !== 'production') {
  //   middlewares.push(createLogger());
  // }

  const enhancer = compose(
    // store enhancers
    applyMiddleware(...middlewares),
    reduxFirestore(firebase) // redux bindings for firestore
  );

  return createStore(rootReducer, enhancer);
};

export default configureStore;
