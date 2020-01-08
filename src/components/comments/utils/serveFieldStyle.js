import styles from '../Comment.module.css';

const serveFieldStyle = (current, inputGroupRef) => {
  const handleFocus = () => inputGroupRef.current.classList.add(styles.active);
  const handleBlur = () => {
    if (!current.value.length) {
      inputGroupRef.current.classList.remove(styles.active);
    }
  };

  if (!current.value.length) {
    handleBlur();
  }

  current.addEventListener('focus', handleFocus);
  current.addEventListener('blur', handleBlur);

  return () => {
    current.removeEventListener('focus', handleFocus);
    current.removeEventListener('blur', handleBlur);
  };
};
export default serveFieldStyle;
