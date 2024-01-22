const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  AUTHORIZATION_FAILURE,
} = require("../utils/errors");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar, email, password } = req.body;

  // const { name, avatar, pwd } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))

    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: ` Invalid Input ` });
      } else if (err.name === "MongoServerError") {
        res.status(BAD_REQUEST).send({ message: ` This user already exists ` });
      } else {
        res.status(DEFAULT).send({ message: ` Uncaughtr error in createUser` });
      }
    });
};

const getCurrentUser = (req, res) => {
  console.log({ message: "1 user by id" });
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res
          .status(NOT_FOUND)
          .send({ message: `Error ${err.statusCode} user not found` });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "Uncaught Error in getCurrentUser" });
      }
    });
};

const patchCurrentUser = (req, res) => {
  console.log({ message: "Update User Info" });
  console.log(req.params.userId);

  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.params.userId, { name }, { avatar })
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res
          .status(NOT_FOUND)
          .send({ message: `Error ${err.statusCode} user not found` });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "Uncaught Error in patchCurrentUser" });
      }
    });
};

const getUsers = (req, res) => {
  console.log({ message: "all Users" });
  console.log(req);
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(DEFAULT).send({ message: "Error in getUsers" }));
};

const login = (req, res) => {
  console.log({ message: "Login request" });
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send(token);
    })
    .catch((err) => {
      res.status(AUTHORIZATION_FAILURE).send({ message: err.message });
    });
};

module.exports = {
  getCurrentUser,
  getUsers,
  createUser,
  login,
  patchCurrentUser,
};
