// const AUTHORIZATION_FAILURE = 401;

class AUTHORIZATION_FAILURE extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = {
  AUTHORIZATION_FAILURE,
};
