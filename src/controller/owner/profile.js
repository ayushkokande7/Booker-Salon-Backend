const Owner = require("../../models/owner");

const getProfile = async (req, res) => {
  try {
    const user = await Owner.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    res.Response(200, null, user);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await Owner.findByIdAndUpdate(req.user_id, req.body, {
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

const updateImage = async (req, res) => {
  try {
    const type = req.body.type;
    const user = await Owner.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    if (type == "profile") user.image = req.body.image;
    else user.shopImg = req.body.image;
    user.save();
    res.Response(200, "Profile updated successfully", user);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const removeImage = async (req, res) => {
  try {
    const user = await Owner.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.image =
      "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg";
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
