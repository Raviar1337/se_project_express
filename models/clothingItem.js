const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: String,
    // work around for authorization
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "user",
    required: true,
  },
  likes: {
    type: Array,
    list: [],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "user",
  },
  createdAt: {
    type: Date,
    value: Date.now,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
