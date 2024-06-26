// middleware/auth.js

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { AUTHORIZATION_FAILURE } = require("../utils/AUTHORIZATION_FAILURE");

// const { AUTHORIZATION_FAILURE } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    // return res
    //   .status(AUTHORIZATION_FAILURE)
    //   .send({ message: "Authorization Required" });
    const error = new AUTHORIZATION_FAILURE("Authorization Required");

    throw error;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return res
    //   .status(AUTHORIZATION_FAILURE)
    //   .send({ message: "Authorization Required" });
    const error = new AUTHORIZATION_FAILURE("Authorization Required");

    throw error;
  }

  req.user = payload;

  return next();
};
