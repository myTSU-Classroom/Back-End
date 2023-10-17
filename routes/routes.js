const facultyRouter = require("./faculty.routes");
const userRouter = require("./user.routes");
const emailRouter = require("./email.routes");
const adminRouter = require("./admin.routes");
require("dotenv/config");

const setupRouter = (app, apiUrl) => {
  app.use(`${apiUrl}/faculty`, facultyRouter);
  app.use(`${apiUrl}/`, userRouter);
  app.use(`${apiUrl}/`, emailRouter);
  app.use(`${apiUrl}/admin`, adminRouter);
  app.use(`${apiUrl}/docs`, (req, res, next) => {
    return res.render("docs", {
      logo: `${process.env.HOST_DEVELOPMENT}/wpf_books.svg`,
    });
  });
};

module.exports = setupRouter;
