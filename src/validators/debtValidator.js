const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validetorMiddleware");

exports.createDebtValidator = [
  check("type", "Type is required").not().isEmpty(),
  check("amount", "Amount is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  check("dueDate", "Due date is required").not().isEmpty(),
  validetorMiddleware,
];

exports.getDebtValidator = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];

exports.updateDebtValidator = [
  check("type", "Type is required").not().isEmpty(),
  check("amount", "Amount is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  check("dueDate", "Due date is required").not().isEmpty(),
  validetorMiddleware,
];

exports.deleteDebtValidator = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];
