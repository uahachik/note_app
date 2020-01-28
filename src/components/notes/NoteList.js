import React, { useState, useEffect, useContext } from 'react';

import ProviderContext from '../../store/ProviderContext';

import firebase from 'firebase';
import ReactQuill from 'react-quill';

import ButtonBar from '../layout/ButtonBar';
import Alert from '../layout/Alert';

const NoteList = ({ history }) => {
  const { provider } = useContext(ProviderContext);

  const [notes, setNotes] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (provider === 'fire_store') {
      let unsubscribeSnapshot = null;
      try {
        unsubscribeSnapshot = firebase
          .firestore()
          .collection('notes')
          .orderBy('timestamp', 'desc')
          .onSnapshot(serverUpdate => {
            const notes = serverUpdate.docs.map(_doc => {
              const data = _doc.data();
              data['id'] = _doc.id;
              return data;
            });
            setNotes([]); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            setNotes(notes);
          });
      } catch (err) {
        console.log('Error getting documents', err);
      }
      return () => {
        unsubscribeSnapshot();
      };
    } else {
      const notes = JSON.parse(localStorage.getItem('notes'));

      if (notes) {
        setNotes(notes.reverse());
      } else {
        setIsAlert(true);
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      }
    }

    if (redirect) {
      return history.push('/shift/add');
    }
  }, [provider, history, redirect]);

  return (
    <>
      {notes.length === 0 ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <>
          {isAlert && (
            <Alert
              alert={{
                msg:
                  'You have no notes in the local storage yet. Please create one.'
              }}
            />
          )}

          {notes.map(note => (
            <div key={note.id} className="mb-3">
              <div
                className="card-header bg-secondary text-white"
                style={{ display: 'flex' }}
              >
                <h5 className="pt-1 mr-auto ml-1">{note.name}</h5>
                <ButtonBar payload={{ note, setNotes }} />
              </div>

              <ReactQuill
                theme={'bubble'}
                value={note.content ? note.content : null}
                readOnly={true}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default NoteList;
