const capitalizeFirstLetter = data => {
  return data
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

export default capitalizeFirstLetter;
