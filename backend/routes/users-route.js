const express = require("express");

const usersControllers = require("../controllers/users-controller");

const router = express.Router();

// router.all("/", usersControllers.authUser);

router.get("/", usersControllers.getAllUsers);

router.get("/:uid", usersControllers.getUserByUid);

router.post("/register", usersControllers.createUser);

router.patch("/:uid", usersControllers.updateUser);

router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
