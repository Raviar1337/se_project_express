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

router.post("/", auth, validateCardBody, createClothingItems);

router.get("/", getClothingItems);

router.put("/:itemId/likes", auth, validateId, likeClothingItem);

router.delete("/:itemId/likes", auth, validateId, unlikeClothingItem);

router.delete("/:itemId", auth, validateId, deleteClothingItem);

module.exports = router;
