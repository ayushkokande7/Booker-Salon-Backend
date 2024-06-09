const Jober = require("../../models/jober");

const getProfile = async (req, res) => {
  try {
    const user = await Jober.findById(req.user_id);
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
    const user = await Jober.findByIdAndUpdate(req.user_id, req.body, {
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
    const user = await Jober.findById(req.user_id);
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

const removeImage = async (req, res) => {
  try {
    const user = await Jober.findById(req.user_id);
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
