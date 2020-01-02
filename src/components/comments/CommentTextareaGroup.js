import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Comment.module.css';

import TextareaAutosize from 'react-autosize-textarea';

import handleLabelLayout from './utils/handleLabelLayout';

const CommentTextareaGroup = ({ contentrObj: { content, setContent } }) => {
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
          //   style={imperativeRule() ? { color: '#8f8f8f' } : null}
        >
          {content.length > 0
            ? null
            : 'Note content is required and will appear here...'}
        </label>
        <TextareaAutosize
          ref={inputRef}
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          className={styles.input}
          style={{ resize: 'none', boxSizing: 'border-box' }}
          autoComplete="off"
        />
        <div className={styles.border} />
      </div>
    </div>
  );
};

CommentTextareaGroup.defaultProps = {
  content: ''
};

CommentTextareaGroup.propTypes = {
  content: PropTypes.string,
  setContentr: PropTypes.func
};

export default CommentTextareaGroup;
