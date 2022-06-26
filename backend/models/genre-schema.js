const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  details: { type: String, required: true },
  type: { type: String, required: true },
});

genreSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Genre", genreSchema);
