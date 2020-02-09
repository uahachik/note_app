import React, { useState, useEffect, useContext } from 'react';

import ProviderContext from '../../store/ProviderContext';

import AddComment from './AddComment';

import firebase from 'firebase';
import Moment from 'react-moment';

export const Comments = ({ id }) => {
  const { provider } = useContext(ProviderContext);

  const [comments, setComments] = useState([]);

  const errStyle =
    'color: black; background: red; font-size: 30px; padding: 15px';

  useEffect(() => {
    if (provider === 'fire_store') {
      try {
        firebase
          .firestore()
          .collection('notes')
          .doc(id)
          .collection('comments')
          .orderBy('timestamp', 'desc')
          .onSnapshot(serverUpdate => {
            const comments = serverUpdate.docs.map(_doc => {
              const data = _doc.data();
              data['id'] = _doc.id;
              return data;
            });
            setComments(comments);
          });
      } catch (err) {
        console.log('%cError getting documents', errStyle, err);
      }
    } else {
      const notes = JSON.parse(localStorage.getItem('notes'));
      notes.forEach(note => {
        if (note.id === id) {
          const { comments } = note;
          setComments(comments);
        }
      });
    }
  }, [id, provider]);

  return (
    <div className="mb-4">
      <h3 className="ml-5 text-success">Comments</h3>

      <AddComment payload={{ id, setComments, errStyle }} />

      {comments.length > 0 && (
        <>
          {comments.map(comment => (
            <div key={comment.id} className="mb-3" style={{ maxWidth: '60%' }}>
              <div className="card-header" style={{ display: 'flex' }}>
                <h6 className="bg-light text-success mr-auto my-auto">
                  {comment.author}
                </h6>

                {comment.timestamp && (
                  <small
                    className="my-auto ml-2 text-muted"
                    style={{ minWidth: 'fit-content', marginLeft: '10px' }}
                  >
                    created at <br />
                    <Moment unix format="HH:mm DD.MM.YYYY" locale="uk">
                      {comment.timestamp.seconds}
                    </Moment>
                  </small>
                )}
              </div>

              <p className="ml-2">{comment.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
