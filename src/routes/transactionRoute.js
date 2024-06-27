const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  // getMonthlySummary,
} = require("../controllers/transactionController");

const {
  createTransactionValidator,
  getTransactionValidator,
  updateTransactionValidator,
  deleteTransactionValidator,
} = require("../validators/transactionValidator");

router
  .route("/")
  .post(createTransactionValidator, createTransaction)
  .get(getTransactions);

router
  .route("/:id")
  .get(getTransactionValidator, getTransaction)
  .put(updateTransactionValidator, updateTransaction)
  .delete(deleteTransactionValidator, deleteTransaction);

// router.route("/summary/monthly/:id").get(getMonthlySummary);

module.exports = router;
