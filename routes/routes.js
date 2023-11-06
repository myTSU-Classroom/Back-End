const facultyRouter = require("./faculty.routes");
const userRouter = require("./user.routes");
const emailRouter = require("./email.routes");
const adminRouter = require("./admin.routes");
const crypto = require("crypto");
const constant = require("../middleware/constants");

const setupRouter = (app) => {
  const apiUrl = constant.apiUrl;
  app.use(`${apiUrl}/faculty`, facultyRouter);
  app.use(`${apiUrl}/`, userRouter);
  app.use(`${apiUrl}/`, emailRouter);
  app.use(`${apiUrl}/admin`, adminRouter);

  app.use(`${apiUrl}/docs`, (req, res, next) => {
    const endpoints = require("../public/docs/endpoints.json");

    return res.render("docs", {
      path: `${apiUrl}/public`,
      jsonData: endpoints,
      nonce: constant.nonce,
    });
  });
};

module.exports = setupRouter;
