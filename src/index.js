const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/serverConfig");
const connect = require("./config/database");
const apiRoutes = require("./routes/index");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const startServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);

    await connect();
    console.log("MongoDB connected");
  });
};

startServer();
