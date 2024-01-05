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

router.put("/id/likes", likeClothingItem);

router.delete("/id/likes", unlikeClothingItem);

router.delete("/id", deleteClothingItem);

module.exports = router;
