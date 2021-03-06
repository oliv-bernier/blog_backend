require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const articlesRoutes = require("./routes/articles");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successful connection to MongoDB!"))
  .catch((error) =>
    console.error({
      message: "Connection to MongoDB failed",
      error,
    })
  );

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/articles", articlesRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
