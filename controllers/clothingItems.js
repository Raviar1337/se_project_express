const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST } = require("../utils/BAD_REQUEST");
const { DEFAULT } = require("../utils/DEFAULT");
const { FORBIDDEN } = require("../utils/FORBIDDEN");
const { NOT_FOUND } = require("../utils/NOT_FOUND");

// const {
//   BAD_REQUEST,
//   NOT_FOUND,
//   DEFAULT,
//   FORBIDDEN,
// } = require("../utils/errors");

const createClothingItems = (req, res, next) => {
  console.log({ message: "Create an item" });
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;

  ClothingItem.create({ name, weather, imageUrl, owner: _id })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST(` Invalid Input `));
      } else if (err.name === "CastError") {
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else {
        next(new DEFAULT("Something Went Wrong"));
      }
    });
};

const getClothingItems = (req, res, next) => {
  console.log({ message: "get all items" });
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch(
      () => {
        next(new DEFAULT("Something went wrong"));
      },
      // res
      //   .status(DEFAULT)
      //   .send({ message: "Uncaught Error in getClothingItems" }),
    );
};

const deleteClothingItem = (req, res, next) => {
  console.log({ message: "delete item by ID" });
  console.log(req.params.itemId);
  const { _id } = req.user;

  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NOT_FOUND("Item not found");
    })
    .then((item) => {
      if (String(item.owner) !== _id) {
        const error = new FORBIDDEN(
          "Unauthorized: You can only delete your own items",
        );

        throw error;
      } else {
        ClothingItem.findByIdAndDelete(req.params.itemId)
          .orFail(() => {
            throw new NOT_FOUND("Item not found");
          })
          .then((clothing) => res.send({ data: clothing }))
          .catch((err) => {
            console.error(err);
            // if (err.statusCode === NOT_FOUND) {
            //   res
            //     .status(NOT_FOUND)
            //     .send({ message: `Error ${err.statusCode} item not found` });
            // } else if (err.name === "CastError") {
            //   res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
            // } else {
            //   res
            //     .status(DEFAULT)
            //     .send({ message: "Uncaught Error in deleteClothing item" });
            // }
            if (err.name === "CastError") {
              next(new BAD_REQUEST("Invalid Params or ID"));
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      console.error(err);
      // if (err.statusCode === NOT_FOUND) {
      //   res
      //     .status(NOT_FOUND)
      //     .send({ message: `Error ${err.statusCode} item not found` });
      // } else if (err.name === "CastError") {
      //   res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      // } else {
      //   res
      //     .status(DEFAULT)
      //     .send({ message: "Uncaught Error in deleteClothing item" });
      // }
      if (err.name === "CastError") {
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else {
        next(err);
      }
    });
};

const likeClothingItem = (req, res, next) => {
  console.log({ message: "like item by ID" });
  console.log(req.user._id);
  console.log(req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throw new NOT_FOUND("Item not found");
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      // console.error(err);
      // if (err.statusCode === NOT_FOUND) {
      //   res
      //     .status(NOT_FOUND)
      //     .send({ message: `Error ${err.statusCode} item not found` });
      // } else if (err.name === "CastError") {
      //   res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      // } else {
      //   res
      //     .status(DEFAULT)
      //     .send({ message: "Uncaught Error in likeClothingItem" });
      // }
      if (err.name === "CastError") {
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else {
        next(err);
      }
    });
};

const unlikeClothingItem = (req, res, next) => {
  console.log({ message: "unlike item by ID" });
  console.log(req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id to the array if it's there
    { new: true },
  )
    .orFail(() => {
      throw new NOT_FOUND("Item not found");
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      // console.error(err);
      // if (err.statusCode === NOT_FOUND) {
      //   res
      //     .status(NOT_FOUND)
      //     .send({ message: `Error ${err.statusCode} item not found` });
      // } else if (err.name === "CastError") {
      //   res.status(BAD_REQUEST).send({ message: "Invalid Params or ID" });
      // } else {
      //   res
      //     .status(DEFAULT)
      //     .send({ message: "Uncaught Error in unlikeClothingItem" });
      // }
      if (err.name === "CastError") {
        next(new BAD_REQUEST("Invalid Params or ID"));
      } else {
        next(err);
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
