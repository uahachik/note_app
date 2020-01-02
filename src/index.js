import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import config from './config';

import firebase from 'firebase/app';

// import 'firebase/firestore';
import 'moment/locale/uk';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// Initialize Firebase
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
