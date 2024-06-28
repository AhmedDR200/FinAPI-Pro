const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
} = require("../controllers/userController");

const {
  createUserValidator,
  updateUserValidator,
  getSingleUserValidator,
} = require("../validators/usersValidator");

const { protect, allowedTo } = require("../controllers/authController");

router.get("/getMe", protect, getLoggedUserData, getUser);

router.patch("/changeMyPassword", protect, updateLoggedUserPassword);

router.patch("/changeMyData", protect, updateLoggedUserData);

// Admin can access this routes
router.use(protect, allowedTo("admin"));

router.patch("/changePassword/:id", changePassword);

router
  .route("/")
  .get(protect, allowedTo("admin"), getUsers)
  .post(createUserValidator, createUser);

router
  .route("/:id")
  .get(getSingleUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUser);

module.exports = router;
