const express = require("express");

const recorController = require("../controllers/record-controller");

const router = express.Router();

// router.get("/", genresControllers.getAllGenres);

router.get("/:recordId", recorController.getRecord);

router.post("/", recorController.addRecord);

// router.patch("/:uid", usersControllers.updateUser);

// router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
