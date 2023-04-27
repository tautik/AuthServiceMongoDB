const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const connect = require("./config/database");

const app = express();

const startServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);

    await connect();
    console.log("MongoDB connected");
  });
};

startServer();