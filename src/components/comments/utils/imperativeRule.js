const imperativeRule = current => {
  if (current[1]) {
    return current[1].length > 0;
  }
};

export default imperativeRule;
