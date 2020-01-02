import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Comment.module.css';

import handleLabelLayout from './utils/handleLabelLayout';
import imperativeRule from './utils/imperativeRule';

const CommentInputGroup = ({ authorObj: { setAuthor, current } }) => {
  const inputGroupRef = useRef();
  const inputRef = useRef();

  useLayoutEffect(() => {
    const { current } = inputRef;
    handleLabelLayout(inputGroupRef, current);
  }, []);

  return (
    <div className={styles.container}>
      <div ref={inputGroupRef} className={styles.inputGroup}>
        <label
          className={styles.label}
          style={imperativeRule(current) ? { color: '#8f8f8f' } : null}
        >
          {imperativeRule(current)
            ? 'Your name'
            : 'Your Name should contain two words'}
        </label>
        <input
          ref={inputRef}
          type="text"
          value={current.join(' ').capitalizeFirst()}
          onChange={e => setAuthor(e.target.value)}
          className={styles.input}
          autoComplete="off"
        />
        <div className={styles.border} />
      </div>
    </div>
  );
};

CommentInputGroup.defaultProps = {
  author: ''
};

CommentInputGroup.propTypes = {
  author: PropTypes.string,
  setAuthor: PropTypes.func
};

export default CommentInputGroup;
