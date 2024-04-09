const router = require("express").Router();
const { getCurrentUser, patchCurrentUser } = require("../controllers/users");
const { validateId } = require("../middlewares/validation");

// const testObject = { name: "bobete" };
// res.send(testObject);

// router.post("/", createUser);

router.get("/me", getCurrentUser);

router.patch("/me", validateId, patchCurrentUser);

// router.get("/", getUsers);

module.exports = router;
