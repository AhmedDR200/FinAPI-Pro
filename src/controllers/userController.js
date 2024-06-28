const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const createToken = require('../utils/createToken');

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

/**
 * @desc    Update a user data
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      bankAccounts: req.body.bankAccounts,
      email: req.body.email,
      avatar: req.body.avatar,
      role: req.body.role,
    },
    { new: true }
  );

  if (!doc) {
    return next(new ApiError("Not Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { doc },
  });
});

/**
 * @desc    Change user password
 * @route   PATCH /api/v1/users/:id/changePassword
 * @access  Private/Admin
 */
exports.changePassword = asyncHandler(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!doc) {
    return next(new ApiError("Not Found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Password Changed Successfully",
    data: { doc },
  });
});

/**
 * @desc    Get logged user data
 * @route   GET /api/v1/users/me
 * @access  Private/AuthUser
 */
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');

  res.status(200).json({
    status: "success",
    data: user,
  });
});

/**
 * @desc    Update logged user data
 * @route   PATCH /api/v1/users/updateMyData
 * @access  Private/AuthUser
 */
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  // generate token
  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    data: user,
    token: token,
  });
});

/**
 * @desc    Update logged user data
 * @route   PATCH /api/v1/users/me
 * @access  Private/AuthUser
 */
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updateduser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updateduser,
  });
});
