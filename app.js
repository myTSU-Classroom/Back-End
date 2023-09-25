const express = require("express");
const app = express();
const mongoose = require("mongoose");
const setupMiddleware = require("./middleware/middleware");

require("dotenv/config");
const apiUrl = process.env.API_URL;
setupMiddleware(app);

const facultyRouter = require("./routes/faculty-route");
// app.use(`${apiUrl}/faculty`, facultyRouter);

const groupRouter = require("./routes/faculty");
app.use(`${apiUrl}/faculty`, groupRouter);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Database is not connected...");
    console.log(err);
  });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
