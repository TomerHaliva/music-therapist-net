const Playlist = require("../models/playlist-schema");

const HttpError = require("../models/http-error");

const getPlaylistById = async (req, res, next) => {
  const playlistId = req.params.playlistId;
  let playlist;
  try {
    playlist = await Playlist.findOne({ id: playlistId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a playlist",
      500 // Error code 500 means something went wrong on the server
    );
    return next(error);
  }
  if (!playlist) {
    const error = new HttpError(
      "Could not find a playlist for the provided playlist id",
      404 // Error code 404 means something went wrong on client
    );
    return next(error);
  }
  res.json({ playlist: playlist });
};

const addPlaylist = async (req, res, next) => {
  const { id, name } = req.body;

  const createdPlaylst = new Playlist({
    id,
    name,
    records: [],
  });

  try {
    await createdPlaylst.save(); // save is already Promise()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      `Creating ${createdPlaylst.name} genre failed.`,
      500
    );
    return next(error);
  }

  res.status(201).json({ playlist: createdPlaylst }); // Code 201 means something new created
};

exports.getPlaylistById = getPlaylistById;
exports.addPlaylist = addPlaylist;
