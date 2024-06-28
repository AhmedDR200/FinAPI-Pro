const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImages");
const UserController = require("../controllers/uploadController");
const { protect } = require("../controllers/authController");

// Route to handle avatar upload
router.post(
  "/upload-avatar",
  protect,
  upload.single("avatar"),
  UserController.uploadAvatar
);

module.exports = router;
