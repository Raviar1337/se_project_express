const router = require("express").Router();
const { getCurrentUser, patchCurrentUser } = require("../controllers/users");

// const testObject = { name: "bobete" };
// res.send(testObject);

// router.post("/", createUser);

router.get("/me", getCurrentUser);

router.patch("/me", patchCurrentUser);

// router.get("/", getUsers);

module.exports = router;
