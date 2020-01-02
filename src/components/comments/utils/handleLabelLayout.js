import styles from '../Comment.module.css';

const handleLabelLayout = (inputGroupRef, current) => {
  const handleFocus = () => inputGroupRef.current.classList.add(styles.active);
  const handleBlur = () => {
    if (!current.value.length) {
      inputGroupRef.current.classList.remove(styles.active);
    }
  };

  current.addEventListener('focus', handleFocus);
  current.addEventListener('blur', handleBlur);

  return () => {
    current.removeEventListener('focus', handleFocus);
    current.removeEventListener('blur', handleBlur);
  };
};

export default handleLabelLayout;
