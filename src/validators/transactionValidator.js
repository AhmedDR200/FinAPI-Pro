const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validetorMiddleware");

exports.createTransactionValidator = [
  check("amount", "Amount is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  check("category", "Category is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  validetorMiddleware,
];

exports.getTransactionValidator = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];

exports.updateTransactionValidator = [
  check("amount", "Amount is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  check("category", "Category is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  validetorMiddleware,
];

exports.deleteTransactionValidator = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];
