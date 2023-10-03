const facultyRouter = require("./faculty.routes");
const userRouter = require("./user.routes");
const emailRouter = require("./email.routes");

const setupRouter = (app, apiUrl) => {
  app.use(`${apiUrl}/faculty`, facultyRouter);
  app.use(`${apiUrl}/`, userRouter);
  app.use(`${apiUrl}/`, emailRouter);
};

module.exports = setupRouter;
