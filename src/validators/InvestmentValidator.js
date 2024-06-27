const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validetorMiddleware");

exports.createInvestmentValidator = [
  check("type", "Type is required").not().isEmpty(),
  check("amount", "Amount is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  validetorMiddleware,
];

exports.getInvestmentValidator = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];

exports.updateInvestmentValidator = [
  check("type", "Type is required").not().isEmpty(),
  check("amount", "Amount is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  validetorMiddleware,
];

exports.deleteInvestmentValidator = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];