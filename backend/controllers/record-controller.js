const Record = require("../models/record-schema");
const Playlist = require("../models/playlist-schema");

const HttpError = require("../models/http-error");

const addRecord = async (req, res, next) => {
  const { title, artistName, videoId, likes, unlikes, playlist } = req.body;
  console.log(playlist);
  const createdRecord = new Record({
    title,
    artistName,
    videoId,
    comments: [],
    likes: 0,
    unlikes: 0,
    playlist,
  });

  try {
    await createdRecord.save(); // save is already Promise()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      `Creating ${createdRecord.title} record failed.`,
      500
    );
    return next(error);
  }

  try {
    await Playlist.findOneAndUpdate(
      { _id: playlist },
      { $push: { records: createdRecord._id } },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      `Could not add new record to ${playlist} playlist.`,
      500
    );
    return next(error);
  }

  res.status(201).json({ record: createdRecord }); // Code 201 means something new created
};

const getRecord = async (req, res, next) => {
  const recordId = req.params.recordId;
  console.log(recordId);

  let record;
  try {
    record = await Record.findOne({ _id: recordId })
      .populate("comments")
      .exec();
    await Record.populate(record, "playlist").then((res) => (record = res));
    // await Record.populate(playlist, "records.comments").then(
    //   (res) => (playlist = res)
    // );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a playlist",
      500 // Error code 500 means something went wrong on the server
    );
    return next(error);
  }
  if (!record) {
    const error = new HttpError(
      "Could not find a playlist for the provided playlist id",
      404 // Error code 404 means something went wrong on client
    );
    return next(error);
  }
  res.json({ record: record.toObject() });
};

const updateRecord = async (req, res, next) => {
  const { likes, unlikes } = req.body;
  console.log(likes);
  console.log(unlikes);

  const recordId = req.params.recordId;
  let record;
  try {
    record = await Record.findById(recordId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update record.",
      500
    );
    return next(error);
  }

  record.likes = likes;
  record.unlikes = unlikes;

  try {
    await record.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update record.",
      500
    );
    return next(error);
  }

  res.status(200).json({ record: record.toObject() });
};

exports.addRecord = addRecord;
exports.getRecord = getRecord;
exports.updateRecord = updateRecord;
