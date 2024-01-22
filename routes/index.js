const router = require("express").Router();

const { NOT_FOUND } = require("../utils/errors");

const { createUser, login } = require("../controllers/users");

const auth = require("../middlewares/auth");

const users = require("./users");
const clothingItems = require("./clothingItems");
// const user = require("../models/user");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", auth, users);
router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
