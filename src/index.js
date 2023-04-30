const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT, baseUrl } = require("./config/serverConfig");
const connect = require("./config/database");
const apiRoutes = require("./routes/index");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  cors({
    origin: baseUrl ?? "*",
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:4173"); // Access Multiple domains via ','
//   res.setHeader("Access-Control-Allow-Methods", "GET POST PUT PATCH DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

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
