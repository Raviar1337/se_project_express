const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  createClothingItems,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems");

// const testObject = { name: "bobete" };
// res.send(testObject);

router.post("/", auth, createClothingItems);

router.get("/", getClothingItems);

router.put("/:itemId/likes", auth, likeClothingItem);

router.delete("/:itemId/likes", auth, unlikeClothingItem);

router.delete("/:itemId", auth, deleteClothingItem);

module.exports = router;
