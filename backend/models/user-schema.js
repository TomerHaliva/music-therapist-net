const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uuid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
