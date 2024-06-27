const express = require("express");
const router = express.Router();
const {
  createInvestment,
  getInvestments,
  getInvestment,
  updateInvestment,
  deleteInvestment,
} = require("../controllers/InvestmentController");

const {
  createInvestmentValidator,
  getInvestmentValidator,
  updateInvestmentValidator,
  deleteInvestmentValidator,
} = require("../validators/InvestmentValidator");

router
  .route("/")
  .post(createInvestmentValidator, createInvestment)
  .get(getInvestments);

router
  .route("/:id")
  .get(getInvestmentValidator, getInvestment)
  .put(updateInvestmentValidator, updateInvestment)
  .delete(deleteInvestmentValidator, deleteInvestment);

module.exports = router;
