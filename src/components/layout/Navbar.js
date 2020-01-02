import React from 'react';
import { Link } from 'react-router-dom';

import ProviderSettings from './ProviderSettings';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Note APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mr-5" id="navbarMain">
          <ul className="navbar-nav ml-auto mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                My Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shift/add" className="nav-link text-light">
                New Note
              </Link>
            </li>
          </ul>
        </div>
        <ProviderSettings />
      </div>
    </nav>
  );
};

export default Navbar;
