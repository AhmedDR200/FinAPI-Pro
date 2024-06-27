const express = require("express");
const router = express.Router();
const {
  createDebt,
  getDebts,
  getDebt,
  updateDebt,
  deleteDebt,
} = require("../controllers/debtController");
const {
  createDebtValidator,
  getDebtValidator,
  updateDebtValidator,
  deleteDebtValidator,
} = require("../validators/debtValidator");

router.route("/").post(createDebtValidator, createDebt).get(getDebts);
router
  .route("/:id")
  .get(getDebtValidator, getDebt)
  .put(updateDebtValidator, updateDebt)
  .delete(deleteDebtValidator, deleteDebt);

module.exports = router;
