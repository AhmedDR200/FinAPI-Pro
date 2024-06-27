const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
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

module.exports = router;
