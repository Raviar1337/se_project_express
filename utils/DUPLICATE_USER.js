// const DUPLICATE_USER = 409;

class DUPLICATE_USER extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = {
  DUPLICATE_USER,
};
