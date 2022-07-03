const { v4: uuid } = require("uuid");
const User = require("../models/user-schema");

const auth = require("../db/firestore-config");
const HttpError = require("../models/http-error");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-avatar");
  } catch (err) {
    const error = new HttpError("Could not find any users", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject()) });
};

const getUserByUid = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.findOne({ uuid: uid }); // Because mongoose, we can use async await, in general findById does not return a Promise(). For Promise() use .exec()
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user",
      500 // Error code 500 means something went wrong on the server
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided uuid",
      404 // Error code 404 means something went wrong on client
    );
    return next(error);
  }
  res.json({ user: user }); // Convert the mongoose user object to normal javascript object
};

const createUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  let isUserExist;
  let uid;

  await auth
    .getUserByEmail(email)
    .then((user) => {
      isUserExist = true;
    })
    .catch(() => (isUserExist = false));

  if (isUserExist) {
    const error = new HttpError(
      "User already exist, please login instead.",
      422 // Status code 422 means the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
    );
    return next(error);
  }

  await auth
    .createUser({
      email: email,
      password: password,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    })
    .then((user) => {
      uid = user.uid;
      console.log("User added to Firebase auth");
    })
    .catch(() => console.log("User did not added to Firebase auth"));

  const createdUser = new User({
    uuid: uid,
    email,
    // password,
    firstName,
    lastName,
    avatar:
      firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase(),
  });

  try {
    await createdUser.save(); // save is already Promise()
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      `Creating ${createdUser.email} user failed.`,
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser }); // Code 201 means something new created
};

const updateUser = async (req, res, next) => {
  const { email } = req.body;
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  user.email = email;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject() });
};

const deleteUser = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    console.log(err);
    return next(error);
  }

  try {
    await user.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(200).json({ message: "User deleted" });
};

exports.getAllUsers = getAllUsers;
exports.getUserByUid = getUserByUid;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
