const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,

  DUPLICATE_USER,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar, email, password } = req.body;

  // const { name, avatar, pwd } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))

    .then((user) => {
      console.log(user);
      res.send({ data: user.email, name, avatar });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        // res.status(BAD_REQUEST).send({ message: ` Invalid Input ` });
        next(new BAD_REQUEST(` Invalid Input `));
      } else if (err.name === "MongoServerError") {
        // res
        //   .status(DUPLICATE_USER)
        //   .send({ message: ` This user already exists ` });
        next(new DUPLICATE_USER(` This user already exists `));
      } else {
        // res.status(DEFAULT).send({ message: ` Uncaughtr error in createUser` });
        next(new DEFAULT("something went wrong when creating user profile"));
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  console.log({ message: "1 user by id" });
  console.log(req.user._id);
  User.findById(req.user._id)
    .orFail(() => {
      const error = new NOT_FOUND("User not found");

      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        // res
        //   .status(NOT_FOUND)
        //   .send({ message: `Error ${err.statusCode} user not found` });
        next(new NOT_FOUND("user not found"));
      } else if (err.name === "CastError") {
        // res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else {
        // res
        //   .status(DEFAULT)
        //   .send({ message: "Uncaught Error in getCurrentUser" });
        next(new DEFAULT("Unknown error when getting user"));
      }
      next(err);
    });
};

const patchCurrentUser = (req, res, next) => {
  console.log({ message: "Update User Info" });
  console.log(req.params.userId);

  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new NOT_FOUND("User not found");

      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        //  res
        //     .status(NOT_FOUND)
        //     .send({ message: `Error ${err.statusCode} user not found` });
        next(new NOT_FOUND("User Not Found"));
      } else if (err.name === "CastError") {
        // res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else if (err.name === "ValidationError") {
        // res.status(BAD_REQUEST).send({ message: ` Invalid Input ` });
        next(new BAD_REQUEST("Invalid Input"));
      } else {
        // res
        //   .status(DEFAULT)
        //   .send({ message: "Uncaught Error in patchCurrentUser" });
        next(new DEFAULT("Unkown Error occured while updating user"));
      }
      next(err);
    });
};

// deleted code left up for study
// const getUsers = (req, res) => {
//   console.log({ message: "all Users" });
//   console.log(req);
//   User.find({})
//     .then((users) => res.send({ data: users }))
//     .catch(() => res.status(DEFAULT).send({ message: "Error in getUsers" }));
// };

const login = (req, res, next) => {
  console.log({ message: "Login request" });
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      // res.status(AUTHORIZATION_FAILURE).send({ message: err.message });
      // const error = new AUTHORIZATION_FAILURE("Invalid Username or Password");

      //   throw error;

      if (err.name === "CastError") {
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,

  createUser,
  login,
  patchCurrentUser,
};
