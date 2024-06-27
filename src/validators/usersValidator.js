const { check, body } = require("express-validator");
const validetorMiddleware = require("../middlewares/validetorMiddleware");

exports.createUserValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters")
    .isLength({
      min: 6,
      max: 200,
    })
    .withMessage("Password must be at least 6 characters long"),
  validetorMiddleware,
];

exports.getSingleUser = [
  check("id", "Id is required").not().isEmpty(),
  validetorMiddleware,
];

exports.updateUserValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  validetorMiddleware,
];
