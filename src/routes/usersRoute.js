const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  createUserValidator,
  getSingleUser,
  updateUserValidator,
} = require("../validators/usersValidator");

router.route("/").post(createUserValidator, createUser).get(getUsers);

router
  .route("/:id")
  .get(getSingleUser, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUser);

module.exports = router;
