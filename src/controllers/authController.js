const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
// const { sanitizeUser } = require("../utils/sanitizeData");
const createToken = require("../utils/createToken");

// @desc    Signup a Admin User
// @route   POST /auth/signupAdmin
// @access  Private
exports.signupAdmin = asyncHandler(async (req, res, next) => {
  // create user
  const admin = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: "admin",
  });
  // create token
  const token = createToken(admin._id);

  res.status(201).json({
    status: "success",
    data: admin,
    token: token,
  });
});

// @desc    Signup a User
// @route   POST /auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // create token
  const token = createToken(user._id);

  res.status(201).json({
    status: "success",
    data: user,
    token: token,
  });
});

// @desc    login a User
// @route   POST /auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // check email & password in body
  const user = await User.findOne({ email: req.body.email });
  const passwordCompare = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!user || !passwordCompare) {
    return next(new ApiError("Invalid Email or Password !", 410));
  }
  // create token
  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    data: user,
    token: token,
  });
});

// @desc    Protect Route
exports.protect = asyncHandler(async (req, res, next) => {
  // Check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);
  }

  if (!token) {
    return next(
      new ApiError(
        "You are not logged in. Please log in to get access to this route",
        401
      )
    );
  }

  // Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);
  } catch (err) {
    return next(new ApiError("Invalid token. Please log in again", 401));
  }

  // Check if user still exists
  const currentUser = await User.findById(decoded.userId);
  console.log("Current User:", currentUser);
  if (!currentUser) {
    return next(
      new ApiError("The user belonging to this token no longer exists", 401)
    );
  }

  // Check if user changed password after the token was issued
  if (currentUser.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(
      "Password Changed At:",
      passwordChangedTime,
      "Token Issued At:",
      decoded.iat
    );
    if (passwordChangedTime > decoded.iat) {
      return next(
        new ApiError("User recently changed password. Please log in again", 401)
      );
    }
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// @desc    Allow to Access Route
exports.allowedTo = (...permittedRoles) =>
  asyncHandler(async (req, res, next) => {
    // Check if user role exists and is permitted
    if (!req.user || !req.user.role) {
      return next(new ApiError("User role not found", 403));
    }

    if (!permittedRoles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }

    next();
  });

// @desc    Forgot Password
// @route   POST /auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  //if user exist, generate reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  // hash the code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // save hashed code to db
  user.passwordResetCode = hashedResetCode;
  // expire time => 10 min
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  // send email
  const message = `
        Dear ${user.name},

        We hope this message finds you well. We have received a request to reset the password for your FinAPI-Pro Account.
        
        Your reset code is: ${resetCode}
        
        To successfully complete the password reset process, kindly enter this code on the designated reset page.
        
        Your account security is of utmost importance to us, and we appreciate your prompt attention to this matter.
        
        If you did not initiate this password reset, please contact our support team immediately.
        
        Thank you for your cooperation in maintaining the security of your account.
        
        Best regards,
        The DEVLANT Team`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (Valid for 10 min)",
      message: message,
    });
  } catch (er) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There is an Error in sending Email", 500));
  }

  res.status(200).json({
    status: "success",
    message: `Reset Code Sent to this Email: ${user.email}`,
  });
});

// @desc    Verify Password Code
// @route   POST /auth/verifyPasswordCode
// @access  Public
exports.verifyPasswordCode = asyncHandler(async (req, res, next) => {
  // get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset Code Invalid or Expired"));
  }
  // reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Reset Code is Verified",
  });
});

// @desc    Reset Password
// @route   POST /auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 400)
    );
  }
  // check if reset code is verifed
  if (!user.passwordResetVerified) {
    return next(new ApiError(`Reset code not verifed`, 404));
  }

  user.password = req.body.newPassword;

  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // generate new token ater all is ok
  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password reset Successfully",
    token: token,
  });
});
