const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const languageSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  country: { type: String, required: true },
});

languageSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Language", languageSchema);
