import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ProviderContext from '../../store/ProviderContext';

import ReactQuill from 'react-quill';
import Moment from 'react-moment';

import Comments from '../comments/Comments';
import { readDoc } from '../../actions/read';

const Note = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const { provider } = useContext(ProviderContext);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (provider === 'fire_store') {
      readDoc(id, setName, setContent, setTime);
    } else {
      const notes = JSON.parse(localStorage.getItem('notes'));
      notes.forEach(note => {
        if (note.id === id) {
          const { name, content, time } = note;
          setName(name);
          setContent(content);
          setTime(time);
        }
      });
    }
  }, [provider, id, history]);

  return (
    <>
      <div className="mb-3">
        <div className="card-header bg-success" style={{ display: 'flex' }}>
          <h5 className="pt-1 ml-1 mr-auto">{name}</h5>
          <div
            className="my-auto ml-2 text-light"
            style={{ minWidth: 'fit-content', marginLeft: '10px' }}
          >
            created at <br />
            <Moment unix format="HH:mm DD.MM.YYYY" locale="uk">
              {time}
            </Moment>
          </div>
        </div>

        <ReactQuill theme={'bubble'} value={content} readOnly={true} />
      </div>
      <Comments id={id} />
    </>
  );
};

Note.defaultProps = {
  id: ''
};

Note.propTypes = {
  id: PropTypes.string
};

export default Note;
