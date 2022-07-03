const express = require("express");

const languageControllers = require("../controllers/language-controller");

const router = express.Router();

router.get("/", languageControllers.getAllLanguages);

router.get("/:languageId", languageControllers.getLanguageById);

router.post("/", languageControllers.addLanguage);

// router.patch("/:uid", usersControllers.updateUser);

// router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
