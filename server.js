// 3rd party modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// custom modules
const ApiError = require("./src/utils/apiError");
const globalError = require("./src/middlewares/errorMiddleware");

// routes
const usersRoute = require("./src/routes/usersRoute");
const transactionsRoute = require("./src/routes/transactionRoute");
const investmentsRoute = require("./src/routes/InvestmentRoute");
const debtRoute = require("./src/routes/debtRoute");

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

// Mount routers
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/transactions", transactionsRoute);
app.use("/api/v1/investments", investmentsRoute);
app.use("/api/v1/debts", debtRoute);

// 404 Error Handling Middleware
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
      .cyan.bold
  );
});
