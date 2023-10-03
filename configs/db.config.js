const mongoose = require("mongoose");

const setupDatabase = (dbConnection, dbName) => {
  mongoose
    .connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    })
    .then(() => {
      console.log("Database connected...");
    })
    .catch((err) => {
      console.log("Database is not connected...");
      console.log(err);
    });
};

module.exports = setupDatabase;
