const express = require("express");
const app = express();
const setupMiddleware = require("./middleware/middleware");
const setupRouter = require("./routes/routes");
const setupDatabase = require("./configs/db.config");

setupMiddleware(app);
setupDatabase();
setupRouter(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
