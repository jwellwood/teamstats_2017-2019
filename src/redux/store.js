import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyDQpjDlXsDXctEZGNjwexMyru6qdR7wQZk',
  authDomain: 'team-stats-31c64.firebaseapp.com',
  databaseURL: 'https://team-stats-31c64.firebaseio.com',
  projectId: 'team-stats-31c64',
  storageBucket: 'team-stats-31c64.appspot.com',
  messagingSenderId: '48891721759',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { /* your settings... */ };
firestore.settings(settings);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase), // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  const defaultSettings = { allowRegistration: false };
  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create store with reducers and initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeEnhancers(reactReduxFirebase(firebase)),
);

export default store;
