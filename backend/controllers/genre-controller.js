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

const getGenreById = async (req, res, next) => {
  const genreId = req.params.genre;
  let genre;
  try {
    genre = await Genre.findOne({ id: genreId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a genre",
      500 // Error code 500 means something went wrong on the server
    );
    return next(error);
  }
  if (!genre) {
    const error = new HttpError(
      "Could not find a genre for the provided genre id",
      404 // Error code 404 means something went wrong on client
    );
    return next(error);
  }
  res.json({ genre: genre }); // Convert the mongoose user object to normal javascript object
};

exports.addGenre = addGenre;
exports.getAllGenres = getAllGenres;
exports.getGenreById = getGenreById;
