const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { errorHandler } = require("./middlewares/error-handler");

const { errors } = require("celebrate");

const { PORT = 3001 } = process.env;
const app = express();

const routes = require("./routes");

app.use(cors());

app.use(express.json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: "65a927418f1b3a3e92c9eb2c", // paste the _id of the test user created in the previous step
//   };
//   next();
// });
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(routes);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
