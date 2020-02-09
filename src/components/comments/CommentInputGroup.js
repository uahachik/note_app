import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Comment.module.css';
import imperativeRule from './utils/imperativeRule';
import serveFieldStyle from './utils/serveFieldStyle';

import capitalizeFirstLetter from './utils/capitalizeFirstLetter';

const CommentInputGroup = ({
  authorObj: {
    author,
    setAuthor,
    isFieldEmpty
    //  current
  }
}) => {
  const count = useRef(0);
  const currInc = count.current++;
  const counStyle = ['color: white', 'background: DeepSkyBlue', 'font-size: 14px', 'padding: 10px 0'].join(';');

  console.log(`%cRender input: %c${currInc}`, `${counStyle}; padding-left: 15px`, `${counStyle}; color: red; font-weight: 700; padding-right: 15px`);

  const inputGroupRef = useRef();
  const inputRef = useRef();

  author = author.trimStart().split(' ', 2);

  useLayoutEffect(() => {
    const { current } = inputRef;
    serveFieldStyle(current, inputGroupRef);
  }, [isFieldEmpty]);

  return (
    <div className={styles.container}>
      <div ref={inputGroupRef} className={styles.inputGroup}>
        <label
          className={styles.label}
          style={imperativeRule(author) ? { color: '#8f8f8f' } : null}
        >
          {imperativeRule(author)
            ? 'Your name'
            : 'Your Name should contain two words'}
        </label>
        <input
          ref={inputRef}
          type="text"
          value={
            author.length !== 0
              ? capitalizeFirstLetter(author.join(' '))
              : author
          }
          onChange={e => setAuthor(e.target.value)}
          // value={capitalizeFirstLetter(author.join(' '))}
          // onChange={e => setAuthor(e.target.value)}
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
