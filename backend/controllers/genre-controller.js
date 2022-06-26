const Genre = require("../models/genre-schema");

const HttpError = require("../models/http-error");

const addGenre = async (req, res, next) => {
  const { id, name, details, type } = req.body;

  const createdGenre = new Genre({
    id,
    name,
    details,
    type,
  });

  try {
    await createdGenre.save(); // save is already Promise()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      `Creating ${createdGenre.name} genre failed.`,
      500
    );
    return next(error);
  }

  res.status(201).json({ genre: createdGenre }); // Code 201 means something new created
};

const getAllGenres = async (req, res, next) => {
  let genres;
  try {
    genres = await Genre.find({});
  } catch (err) {
    const error = new HttpError("Could not find any genre", 500);
    return next(error);
  }

  res.json({ genres: genres.map((genre) => genre.toObject()) });
};

exports.addGenre = addGenre;
exports.getAllGenres = getAllGenres;
