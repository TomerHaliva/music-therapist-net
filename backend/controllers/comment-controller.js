const Record = require("../models/record-schema");
const Comment = require("../models/comment-schema");

const HttpError = require("../models/http-error");

const addComment = async (req, res, next) => {
  const { uid, avatar, text, record } = req.body;

  let _record;
  
  const createdComment = new Comment({
    uid,
    avatar,
    text,
    likes: 0,
    unlikes: 0,
  });

  try {
    await createdComment.save(); // save is already Promise()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      `Creating ${createdComment.text} comment failed.`,
      500
    );
    return next(error);
  }

  try {
    await Record.findOneAndUpdate(
      { title: record },
      { $push: { comments: createdComment._id } },
      { new: true }
    );
    _record = await Record.findOne({ title: record })
      .populate("comments")
      .exec();
  } catch (err) {
    const error = new HttpError(
      `Could not add new comment to ${playlist} playlist.`,
      500
    );
    return next(error);
  }

  res.status(201).json({ comment: _record.comments }); // Code 201 means something new created
};

exports.addComment = addComment;
