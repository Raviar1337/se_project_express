// const NOT_FOUND = 404;

class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = {
  NOT_FOUND,
};
