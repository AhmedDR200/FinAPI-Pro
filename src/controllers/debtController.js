const Debt = require("../models/debt");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc    Create a new debt
 * @route   POST /api/v1/debts
 * @access  Private/User
 */
exports.createDebt = asyncHandler(async (req, res) => {
  const debt = await Debt.create(req.body);
  res.status(201).json({
    status: "success",
    data: debt,
  });
});

/**
 * @desc    Get all debts
 * @route   GET /api/v1/debts
 * @access  Private/User
 */
exports.getDebts = asyncHandler(async (req, res) => {
  const debts = await Debt.find();
  res.status(200).json({
    status: "success",
    data: debts,
  });
});

/**
 * @desc    Get a single debt
 * @route   GET /api/v1/debts/:id
 * @access  Private/User
 */
exports.getDebt = asyncHandler(async (req, res) => {
  const debt = await Debt.findById(req.params.id);
  if (!debt) {
    throw new ApiError(`Debt not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: "success",
    data: debt,
  });
});

/**
 * @desc    Update a debt
 * @route   PUT /api/v1/debts/:id
 * @access  Private/User
 */
exports.updateDebt = asyncHandler(async (req, res) => {
  const debt = await Debt.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!debt) {
    throw new ApiError(`Debt not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: "success",
    data: debt,
  });
});

/**
 * @desc    Delete a debt
 * @route   DELETE /api/v1/debts/:id
 * @access  Private/User
 */
exports.deleteDebt = asyncHandler(async (req, res) => {
  const debt = await Debt.findByIdAndDelete(req.params.id);
  if (!debt) {
    throw new ApiError(`Debt not found with id of ${req.params.id}`, 404);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
