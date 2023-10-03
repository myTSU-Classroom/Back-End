const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");

const setupMiddleware = (app) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.options("*", cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "ejs");
};

module.exports = setupMiddleware;
