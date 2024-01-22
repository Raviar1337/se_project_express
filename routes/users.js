const router = require("express").Router();
const { getCurrentUser, patchCurrentUser } = require("../controllers/users");

// const testObject = { name: "bobete" };
// res.send(testObject);

// router.post("/", createUser);

router.get("/me/:userId", getCurrentUser);

router.patch("/me/:userId", patchCurrentUser);

// router.get("/", getUsers);

module.exports = router;
