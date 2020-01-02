import React, { useState, useRef, useContext } from 'react';

import PropTypes from 'prop-types';

import ProviderContext from '../../store/ProviderContext';

import CommentInputGroup from './CommentInputGroup';
import CommentTextareaGroup from './CommentTextareaGroup';

import firebase from 'firebase';

import imperativeRule from './utils/imperativeRule';

import styles from './Comment.module.css';

// Eslint doesn't realize prototype type and showing the warning
// You could convert "capitalizeFirst" to function or just tolerate
import { capitalizeFirst } from '../../helpers';

const AddComment = ({ payload: { id, setComments } }) => {
  const { provider } = useContext(ProviderContext);

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const nameRule = useRef();
  let { current } = nameRule;
  current = author.trimStart().split(' ', 2);

  //   console.log(`"${author.trimEnd().capitalizeFirst()}"`);

  //   nameRule.current = author.split(/(\w.+\s).+/i);

  //   console.log('nameRule', nameRule.current);

  //   console.log('author', author);

  const onSubmit = async e => {
    e.preventDefault();
    if (provider === 'fire_store') {
      await firebase
        .firestore()
        .collection('notes')
        .doc(id)
        .collection('comments')
        .add({
          author: author.trimEnd().capitalizeFirst(),
          content,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
          console.log('Document successfully written!');
        })
        .catch(function(error) {
          console.error('Error writing document: ', error);
        });
    } else {
      let note;
      let comments;
      let notes = JSON.parse(localStorage.getItem('notes'));
      notes.forEach(n => {
        if (n.id === id) {
          note = n;
          const local = n.comments;
          if (local.length === 0) {
            comments = [];
          } else {
            comments = local;
          }
        }
      });

      const comment = {
        id: Math.round(new Date().getTime() / 1000),
        author: author.trimEnd().capitalizeFirst(),
        content,
        timestamp: { seconds: Math.round(new Date().getTime() / 1000) }
      };

      notes = notes.filter(note => note.id !== id);
      note = { ...note, comments: [...comments, comment] };

      localStorage.setItem('notes', JSON.stringify([...notes, note]));

      setComments([...comments, comment]);

      setAuthor('');
      setContent('');
    }
  };

  return (
    <form className="mb-4 ml-2" onSubmit={onSubmit}>
      <CommentInputGroup authorObj={{ setAuthor, current }} />

      <CommentTextareaGroup contentrObj={{ content, setContent }} />

      {imperativeRule(current) && content.length > 0 ? (
        <input
          type="submit"
          value="Comment"
          className="btn btn-success px-4 mt-4"
        />
      ) : null}
    </form>
  );
};

AddComment.defaultProps = {
  id: ''
};

AddComment.propTypes = {
  id: PropTypes.string
};

export default AddComment;
