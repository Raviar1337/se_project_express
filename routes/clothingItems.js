const router = require("express").Router();
const {
  createClothingItems,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/clothingItems.js");

// const testObject = { name: "bobete" };
// res.send(testObject);

router.post("/", createClothingItems);

router.get("/", getClothingItems);

router.put("/:itemId/likes", likeClothingItem);

router.delete("/:itemId/likes", unlikeClothingItem);

router.delete("/:itemId", deleteClothingItem);

module.exports = router;
