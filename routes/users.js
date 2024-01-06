const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// const testObject = { name: "bobete" };
// res.send(testObject);

router.post("/", createUser);

router.get("/:userId", getUser);

router.get("/", getUsers);

module.exports = router;
