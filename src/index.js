import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import App from './components/App';
import configureStore from './configureStore';
import firebase from './config/fbConfig';
import * as serviceWorker from './serviceWorker';
import './index.css';

const rrfConfig = {
  userProfile: 'users', // sync collection with profile object on state
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const store = configureStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const Root = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
