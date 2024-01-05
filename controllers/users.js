const User = require("../models/user.js");
const { defaultServerError } = require("../utils/errors.js");

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
        res.status(400).send({ message: ` Invalid Input ` });
      } else {
        res.status(500).send({ message: ` Uncaughtr error in createUser` });
      }
    });
};

const getUser = (req, res) => {
  console.log({ message: "1 user by id" });
  console.log(req.query.id);
  User.findById(req.query.id)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === 404) {
        res.send({ message: `Error ${err.statusCode} user not found` });
      } else {
        res.status(500).send({ message: "Uncaught Error in getUser" });
      }
    });
};

const getUsers = (req, res) => {
  console.log({ message: "all Users" });
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Error in getUsers" }));
};

module.exports = { getUser, getUsers, createUser };
