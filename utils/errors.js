// const BAD_REQUEST = 400;

class BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

// const AUTHORIZATION_FAILURE = 401;

class AUTHORIZATION_FAILURE extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

// const FORBIDDEN = 403;

class FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

// const NOT_FOUND = 404;

class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

// const DUPLICATE_USER = 409;

class DUPLICATE_USER extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class DEFAULT extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  DUPLICATE_USER,
  AUTHORIZATION_FAILURE,
  FORBIDDEN,
};

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 404;
//   }
// }

// module.exports = NotFoundError;
