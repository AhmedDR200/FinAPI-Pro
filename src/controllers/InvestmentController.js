const Investment = require("../models/Investment");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc    Create a new investment
 * @route   POST /api/v1/investments
 * @access  Private/User
 */
exports.createInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.create(req.body);
  res.status(201).json({
    status: "success",
    data: investment,
  });
});

/**
 * @desc    Get all investments
 * @route   GET /api/v1/investments
 * @access  Private/User
 */
exports.getInvestments = asyncHandler(async (req, res) => {
  const investments = await Investment.find();
  res.status(200).json({
    status: "success",
    data: investments,
  });
});

/**
 * @desc    Get a single investment
 * @route   GET /api/v1/investments/:id
 * @access  Private/User
 */
exports.getInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    throw new ApiError(`Investment not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: "success",
    data: investment,
  });
});

/**
 * @desc    Update an investment
 * @route   PUT /api/v1/investments/:id
 * @access  Private/User
 */
exports.updateInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!investment) {
    throw new ApiError(`Investment not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: "success",
    data: investment,
  });
});

/**
 * @desc    Delete an investment
 * @route   DELETE /api/v1/investments/:id
 * @access  Private/User
 */
exports.deleteInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findByIdAndDelete(req.params.id);
  if (!investment) {
    throw new ApiError(`Investment not found with id of ${req.params.id}`, 404);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
