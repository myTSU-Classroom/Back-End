const express = require("express");
const app = express();
const setupMiddleware = require("./middleware/middleware");
const setupRouter = require("./routes/routes");
const setupDatabase = require("./configs/db.config");

require("dotenv/config");
setupMiddleware(app);
setupDatabase(process.env.DB_CONNECTION, process.env.DB_NAME);
setupRouter(app, process.env.API_URL);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
