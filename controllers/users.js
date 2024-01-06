const User = require("../models/user");

const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("../utils/errors");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: ` Invalid Input ` });
      } else {
        res.status(DEFAULT).send({ message: ` Uncaughtr error in createUser` });
      }
    });
};

const getUser = (req, res) => {
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
        res.status(DEFAULT).send({ message: "Uncaught Error in getUser" });
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

module.exports = { getUser, getUsers, createUser };
