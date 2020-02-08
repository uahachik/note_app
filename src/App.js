import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/layout/ErrorBoundary';

import ProviderContext from './store/ProviderContext';
import './App.css';

import Navbar from './components/layout/Navbar';
const NoteList = lazy(() => import('./components/notes/NoteList'));
const Note = lazy(() => import('./components/notes/Note'));
const ShiftNote = lazy(() => import('./components/notes/ShiftNote'));

// pull-request prepare
<<<<<<< HEAD
console.log('test')
=======
console.log('push')
>>>>>>> 86a163e91a2b78acc21ba47ccb911e5ddb035912

const App = () => {
  const [provider, setProvider] = useState('fire_store');

  return (
    <ErrorBoundary>
      <ProviderContext.Provider value={{ provider, setProvider }}>
        <Router>
          <Suspense fallback={<h2 className="text-center mt-4">Loading...</h2>}>
            <div className="App">
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={NoteList} />
                  <Route exact path="/see/:id" component={Note} />
                  <Route exact path="/shift/:id" component={ShiftNote} />
                </Switch>
              </div>
            </div>
          </Suspense>
        </Router>
      </ProviderContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
