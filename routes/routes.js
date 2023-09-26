const facultyRouter = require("./faculty.routes");
const userRouter = require("./user.routes");

const setupRouter = (app, apiUrl) => {
  app.use(`${apiUrl}/faculty`, facultyRouter);
  app.use(`${apiUrl}/`, userRouter);
};

module.exports = setupRouter;
