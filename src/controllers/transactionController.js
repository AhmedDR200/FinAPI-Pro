const Transaction = require("../models/transaction");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc    Create a new transaction
 * @route   POST /api/v1/transactions
 * @access  Private/User
 */
exports.createTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.create(req.body);
  res.status(201).json({
    status: "success",
    data: transaction,
  });
});

/**
 * @desc    Get all transactions
 * @route   GET /api/v1/transactions
 * @access  Private/User
 */
exports.getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200).json({
    status: "success",
    data: transactions,
  });
});

/**
 * @desc    Get a single transaction
 * @route   GET /api/v1/transactions/:id
 * @access  Private/User
 */
exports.getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    throw new ApiError(
      `Transaction not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({
    status: "success",
    data: transaction,
  });
});

/**
 * @desc    Update a transaction
 * @route   PUT /api/v1/transactions/:id
 * @access  Private/User
 */
exports.updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!transaction) {
    throw new ApiError(
      `Transaction not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({
    status: "success",
    data: transaction,
  });
});

/**
 * @desc    Delete a transaction
 * @route   DELETE /api/v1/transactions/:id
 * @access  Private/User
 */
exports.deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction) {
    throw new ApiError(
      `Transaction not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
