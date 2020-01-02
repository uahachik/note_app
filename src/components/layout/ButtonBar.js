import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProviderContext from '../../store/ProviderContext';

import { deleteDoc } from '../../actions/delete';

const ButtonBar = ({
  payload: {
    note: { id, name },
    setNotes
  }
}) => {
  const { provider, setProvider } = useContext(ProviderContext);

  const deleteNote = async _id => {
    if (
      window.confirm(
        `Are you sure you want to delete the note with title: "${name}"`
      )
    ) {
      if (provider === 'fire_store') {
        deleteDoc(id);
      } else {
        const notes = JSON.parse(localStorage.getItem('notes')).filter(
          note => note.id !== id
        );

        if (notes.length > 0) {
          localStorage.setItem('notes', JSON.stringify(notes));
          setNotes(notes.reverse());
        } else {
          localStorage.removeItem('notes');
          setProvider('fire_store');
        }
      }
    }
  };
  return (
    <nav className="my-auto ml-2 bg-dark">
      <ul className="small" style={buttonStyle}>
        <li className="nav-item" style={listStyle}>
          <Link to={`/see/${id}`} className="nav-link text-success">
            See
          </Link>
        </li>
        <li className="nav-item" style={listStyle}>
          <Link to={`/shift/${id}`} className="nav-link">
            Edit
          </Link>
        </li>
        <li className="nav-item" onClick={() => deleteNote()}>
          <Link to="#" className="nav-link text-danger" style={listStyle}>
            Delete
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const buttonStyle = {
  display: 'flex',
  listStyleType: 'none',
  padding: '0',
  margin: '0',
  // backgroundColor: '#23262a',
  borderRadius: '3%',
  boxShadow: 'rgb(39, 41, 42) 0px 0px 1px 1px'
  // boxShadow: 'rgb(135, 142, 157) 0px 0px 1px 1px'
};

const listStyle = { boxShadow: 'rgba(2, 8, 15, 01) 1px 0px 1px 0px' };

ButtonBar.defaultProps = {
  id: ''
};

ButtonBar.propTypes = {
  id: PropTypes.string
};

export default ButtonBar;
