// 3rd party modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Load config
dotenv.config();

const app = express();

// connect to database
require("./src/config/db")();

// body-parser
app.use(express.json());

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
      .cyan.bold
  );
});
