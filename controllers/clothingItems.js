const ClothingItem = require("../models/clothingItem.js");

const createClothingItems = (req, res) => {
  console.log({ message: "Create an item" });
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;

  ClothingItem.create({ name, weather, imageUrl, owner: _id })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: ` Invalid Input ` });
      } else {
        res
          .status(500)
          .send({ message: ` Uncaughtr error in createClothingItems` });
      }
    });
};

const getClothingItems = (req, res) => {
  console.log({ message: "get all items" });
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch(() =>
      res.status(500).send({ message: "Error in getClothingItems" }),
    );
};

const deleteClothingItem = (req, res) => {
  console.log({ message: "delete item by ID" });
  console.log(req.query.id);
  ClothingItem.findByIdAndDelete(req.query.id)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === 404) {
        res.send({ message: `Error ${err.statusCode} item not found` });
      } else {
        res
          .status(500)
          .send({ message: "Uncaught Error in deleteClothing item" });
      }
    });
};

const likeClothingItem = (req, res) => {
  console.log({ message: "like item by ID" });
  console.log(req.query.id);
  ClothingItem.findByIdAndUpdate(
    req.query.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === 404) {
        res.send({ message: `Error ${err.statusCode} item not found` });
      } else {
        res.status(500).send({ message: "Uncaught Error in likeClothingItem" });
      }
    });
};

const unlikeClothingItem = (req, res) => {
  console.log({ message: "unlike item by ID" });
  console.log(req.query.id);
  ClothingItem.findByIdAndUpdate(
    req.query.id,
    { $pull: { likes: req.user._id } }, // remove _id to the array if it's there
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === 404) {
        res.send({ message: `Error ${err.statusCode} item not found` });
      } else {
        res
          .status(500)
          .send({ message: "Uncaught Error in unlikeClothingItem" });
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItems,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
};
