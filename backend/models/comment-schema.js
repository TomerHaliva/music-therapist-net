const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  // id: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  avatar: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, required: true },
  unlikes: { type: Number, required: true },
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", commentSchema);
