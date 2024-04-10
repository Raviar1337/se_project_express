// const BAD_REQUEST = 400;

class BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = {
  BAD_REQUEST,
};