const express = require("express");

const recordController = require("../controllers/record-controller");

const router = express.Router();

// router.get("/", genresControllers.getAllGenres);

router.get("/:recordId", recordController.getRecord);

router.post("/", recordController.addRecord);

router.patch("/:recordId", recordController.updateRecord);

// router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
