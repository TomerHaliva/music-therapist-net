const express = require("express");

const genresControllers = require("../controllers/genre-controller");

const router = express.Router();

router.get("/", genresControllers.getAllGenres);

router.post("/", genresControllers.addGenre);

// router.patch("/:uid", usersControllers.updateUser);

// router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
