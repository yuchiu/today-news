/*
 * first arg is min time in millisecond,
 * second arg random time in millisecond add on top of min time
 */
export default (base, max) => (req, res, next) => {
  setTimeout(next, Math.floor(base + Math.random() * max));
};
