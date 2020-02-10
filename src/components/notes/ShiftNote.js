import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ProviderContext from '../../store/ProviderContext';

import { readDoc } from '../../actions/read';
import { createDoc } from '../../actions/create';
import { updateDoc } from '../../actions/update';
// import { debounce } from '../../helpers';
import Alert from '../layout/Alert';

import ReactQuill from 'react-quill';
import uuid from 'uuid';

const ShiftNote = ({
  history,
  match: {
    params: { id }
  },
  placeholder
}) => {
  const { provider } = useContext(ProviderContext);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    setName('');
    setContent('');
    if (provider === 'fire_store') {
      if (id !== 'add') {
        // read from firestore
        readDoc(id, setName, setContent);
      }
    } else {
      if (id !== 'add') {
        // read from local storage
        const notes = JSON.parse(localStorage.getItem('notes'));

        notes.forEach(note => {
          if (note.id === id) {
            const { name, content, comments } = note;
            setName(name);
            setContent(content);
            setComments(comments);
          }
        });
      }
    }
  }, [provider, id]);

  const handleContentChange = async value => {
    setContent(value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    // check name, content is required
    if (name && name.length !== '' && content && content.length !== '') {
      // save to firestore
      if (provider === 'fire_store') {
        // firestore set method doesn't generate id object
        // for this reason, the update process was divided by add and update
        if (id === 'add') {
          createDoc(name, content);
        } else {
          updateDoc(id, name, content);
        }
      } else if (provider === 'local_storage') {
        const local = JSON.parse(localStorage.getItem('notes'));

        // create note
        if (id === 'add') {
          let notes;
          if (local === null) {
            notes = [];
          } else {
            notes = local;
          }
          const note = {
            id: uuid.v4(),
            name: name.toUpperCase(),
            content,
            time: Math.round(new Date().getTime() / 1000),
            comments: []
          };
          // save to local storage
          localStorage.setItem('notes', JSON.stringify([...notes, note]));
        } else {
          //update note
          const notes = local.filter(note => note.id !== id);
          const note = {
            id,
            name: name.toUpperCase(),
            content,
            time: Math.round(new Date().getTime() / 1000),
            comments
          };
          // save to local storage
          localStorage.setItem('notes', JSON.stringify([...notes, note]));
        }
      }

      history.push('/');
    } else {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      {isAlert && <Alert alert={{ msg: 'Note Content is Required!' }} />}

      <form className="form container" onSubmit={onSubmit}>
        <div className="form-group bg-info">
          <div className="card-header" style={{ borderBottom: 'none' }}>
            {/* <div className="col-12 p-3" style={{ borderBottom: 'none' }}> */}
            <label htmlFor="name">
              <span
                className={name.length === 0 ? 'text-warning' : 'text-muted'}
              >
                {name.length === 0 ? 'Note name is required' : 'Note name'}
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Give a name to the note"
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-control "
              required
            />
          </div>

          <div className="card-header">
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={ShiftNote.modules}
              placeholder={placeholder}
            />
          </div>
        </div>

        <input
          type="submit"
          value={id === 'add' ? 'ADD NOTE' : 'UPDATE NOTE'}
          className="btn btn-info px-5"
        />
      </form>
    </>
  );
};

ShiftNote.modules = {
  toolbar: [
    [
      // { header: '1' }, { header: '2' },
      { font: [] }
    ],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    // ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

ShiftNote.defaultProps = {
  id: '',
  placeholder: 'Add note content here...'
};

ShiftNote.propTypes = {
  id: PropTypes.string
};

export default ShiftNote;
