const mongoose = require("mongoose");

const postShema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Number, required: true },
  text: { type: String, required: false },
  imageUrl: { type: String, required: false },
  likes: { type: Number, required: true },
  usersLiked: [String],
});

module.exports = mongoose.model("Post", postShema);
