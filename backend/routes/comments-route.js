const express = require("express");

const commentController = require("../controllers/comment-controller");

const router = express.Router();

// router.get("/", genresControllers.getAllGenres);

router.post("/", commentController.addComment);

// router.patch("/:uid", usersControllers.updateUser);

// router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
