const router = require("express").Router();

const { NOT_FOUND } = require("../utils/errors");

const { createUser, login } = require("../controllers/users");

const auth = require("../middlewares/auth");

const users = require("./users");
const clothingItems = require("./clothingItems");
const {
  validateLoginRequest,
  validateUserInfo,
} = require("../middlewares/validation");
// const user = require("../models/user");

router.post("/signin", validateLoginRequest, login);
router.post("/signup", validateUserInfo, createUser);

router.use("/users", auth, users);
router.use("/items", clothingItems);

router.use(() => {
  //  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
  const error = new NOT_FOUND("Requested resource not found");

  throw error;
});

module.exports = router;
