const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

const usersRoutes = require("./routes/users-route");
const languageRoutes = require("./routes/language-route");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/languages", languageRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://halivatomer:Aa123456@music-therapist-cluster.odp84.mongodb.net/music-therapist-net?retryWrites=true&w=majority"
  )
  .then(
    app.listen(5000, () => {
      console.log("Listening on http://localhost:5000");
    })
  )
  .catch((err) => console.log(err));
