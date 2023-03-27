require("dotenv").config();
require("express-async-errors");

// extra security check package
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
// moduless necessary
const morgan = require("morgan");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");

//
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(xss());

// connect to DB
const connectDB = require("./db/connect");

// routes public
app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
// routes api
app.use("/api/v1/auth", authRouter);

// config to port
const port = process.env.PORT || 5000;

// launch to server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI_REMOTO);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
