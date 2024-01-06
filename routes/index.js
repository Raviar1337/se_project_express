const router = require("express").Router();

const users = require("./users");
const clothingItems = require("./clothingItems");
// const user = require("../models/user");

router.use("/users", users);

router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
