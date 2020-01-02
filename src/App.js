import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import NoteList from './components/notes/NoteList';
import Note from './components/notes/Note';
import ShiftNote from './components/notes/ShiftNote';

import ProviderContext from './store/ProviderContext';

import './App.css';

const App = () => {
  const [provider, setProvider] = useState('fire_store');

  return (
    <ProviderContext.Provider value={{ provider, setProvider }}>
      <Router>
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
      </Router>
    </ProviderContext.Provider>
  );
};

export default App;
