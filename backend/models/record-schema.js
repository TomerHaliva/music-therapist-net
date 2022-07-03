const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  // id: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  artistName: { type: String, required: true },
  videoId: { type: String, required: true, unique: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number },
  unlikes: { type: Number },
  playlist: { type: Schema.Types.ObjectId, ref: "Playlist" },
});

recordSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Record", recordSchema);
