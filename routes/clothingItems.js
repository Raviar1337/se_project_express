const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  createClothingItems,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/validation");

// const testObject = { name: "bobete" };
// res.send(testObject);

router.post("/", validateCardBody, auth, createClothingItems);

router.get("/", getClothingItems);

router.put("/:itemId/likes", validateId, auth, likeClothingItem);

router.delete("/:itemId/likes", validateId, auth, unlikeClothingItem);

router.delete("/:itemId", validateId, auth, deleteClothingItem);

module.exports = router;
