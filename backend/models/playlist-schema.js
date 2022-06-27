const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  records: { type: Array, required: true },
});

playlistSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Playlist", playlistSchema);
