const cloudinary = require("../utils/cloudinary");
const User = require("../models/users");

// Controller function to handle avatar upload
async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update user avatar field with Cloudinary image URL or public ID
    const user = await User.findById(req.user._id); // Assuming you have user authentication
    user.avatar = result.secure_url; // or result.public_id if storing public ID
    await user.save();

    // Return success response
    res
      .status(200)
      .json({
        message: "Avatar uploaded successfully",
        avatarUrl: result.secure_url,
      });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res
      .status(500)
      .json({ message: "Avatar upload failed", error: error.message });
  }
}

module.exports = {
  uploadAvatar,
};
