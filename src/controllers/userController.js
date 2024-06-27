const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc    Create a new user
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: user,
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

/**
 * @desc    Get a single user
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 */
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(`User not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

/**
 * @desc    Update a user
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new ApiError(`User not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new ApiError(`User not found with id of ${req.params.id}`, 404);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
