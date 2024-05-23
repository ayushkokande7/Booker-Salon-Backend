const User = require("../../models/customer");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    res.Response(200, "User found", user);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user_id, req.body, {
      new: true,
    });
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.save();
    res.Response(200, "Profile updated successfully", user);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

updateImage = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.image = req.body.image;
    user.save();
    res.Response(200, "Profile updated successfully", user);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

removeImage = async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.image = null;
    user.save();
    res.Response(200, "Profile updated successfully", user);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateImage,
  removeImage,
};
