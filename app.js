const express = require("express");

const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "658ecbccbb18b846d088ae93", // paste the _id of the test user created in the previous step
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
