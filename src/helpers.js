export const debounce = (a, b, c) => {
  var d, e;
  return function() {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
};

export const removeHTMLTags = str => {
  return str.replace(/<[^>]*>?/gm, '');
};

export const capitalizeFirst = (String.prototype.capitalizeFirst = function() {
  return this.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
});
