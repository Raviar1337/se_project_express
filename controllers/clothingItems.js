const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  FORBIDDEN,
} = require("../utils/errors");

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
        res.status(BAD_REQUEST).send({ message: ` Invalid Input ` });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: ` Uncaughtr error in createClothingItems` });
      }
    });
};

const getClothingItems = (req, res) => {
  console.log({ message: "get all items" });
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch(() =>
      res
        .status(DEFAULT)
        .send({ message: "Uncaught Error in getClothingItems" }),
    );
};

const deleteClothingItem = (req, res) => {
  console.log({ message: "delete item by ID" });
  console.log(req.params.itemId);
  const { _id } = req.user;

  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (String(item.owner) !== _id) {
        res.status(FORBIDDEN).send({
          message: "Unauthorized: You can only delete your own items",
        });
      } else {
        ClothingItem.findByIdAndDelete(req.params.itemId)
          .orFail(() => {
            const error = new Error("Item not found");
            error.statusCode = NOT_FOUND;
            throw error;
          })
          .then((clothing) => res.send({ data: clothing }))
          .catch((err) => {
            console.error(err);
            if (err.statusCode === NOT_FOUND) {
              res
                .status(NOT_FOUND)
                .send({ message: `Error ${err.statusCode} item not found` });
            } else if (err.name === "CastError") {
              res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
            } else {
              res
                .status(DEFAULT)
                .send({ message: "Uncaught Error in deleteClothing item" });
            }
          });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res
          .status(NOT_FOUND)
          .send({ message: `Error ${err.statusCode} item not found` });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "Uncaught Error in deleteClothing item" });
      }
    });
};

const likeClothingItem = (req, res) => {
  console.log({ message: "like item by ID" });
  console.log(req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res
          .status(NOT_FOUND)
          .send({ message: `Error ${err.statusCode} item not found` });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      } else {
        res
          .status(DEFAULT)
          .send({ message: "Uncaught Error in likeClothingItem" });
      }
    });
};

const unlikeClothingItem = (req, res) => {
  console.log({ message: "unlike item by ID" });
  console.log(req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id to the array if it's there
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        res
          .status(NOT_FOUND)
          .send({ message: `Error ${err.statusCode} item not found` });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      } else {
        res
          .status(DEFAULT)
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
