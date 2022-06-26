const Language = require("../models/language-schema");

const HttpError = require("../models/http-error");

const addLanguage = async (req, res, next) => {
  const { id, name, image, country } = req.body;

  const createdLanguage = new Language({
    id,
    name,
    image,
    country,
  });

  try {
    await createdLanguage.save(); // save is already Promise()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      `Creating ${createdLanguage.name} language failed.`,
      500
    );
    return next(error);
  }

  res.status(201).json({ language: createdLanguage }); // Code 201 means something new created
};

const getAllLanguages = async (req, res, next) => {
  let languages;  
  try {
    languages = await Language.find({});
  } catch (err) {
    const error = new HttpError("Could not find any languages", 500);
    return next(error);
  }

  res.json({ languages: languages.map((language) => language.toObject()) });

}; 

exports.addLanguage = addLanguage;
exports.getAllLanguages = getAllLanguages;
