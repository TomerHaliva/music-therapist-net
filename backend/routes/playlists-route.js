const express = require("express");

const playlistController = require("../controllers/playlist-controller");

const router = express.Router();

// router.get("/", genresControllers.getAllGenres);

router.get("/:playlistId", playlistController.getPlaylistById);

router.post("/", playlistController.addPlaylist);

// router.patch("/:uid", usersControllers.updateUser);

// router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
