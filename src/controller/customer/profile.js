const Customer = require("../../models/customer");

const getProfile = async (req, res) => {
  try {
    const user = await Customer.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    res.Response(200, null, user);
  } catch (error) {
    res.Response(500, "Internal server error");
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await Customer.findByIdAndUpdate(req.user_id, req.body, {
      new: true,
    });
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.save();
    res.Response(200, "Profile updated successfully", user);
  } catch (error) {
    res.Response(500, "Internal server error");
  }
};

const updateImage = async (req, res) => {
  try {
    const user = await Customer.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.image = req.body.image;
    user.save();
    res.Response(200, null, user);
  } catch (error) {
    res.Response(500, "Internal server error");
  }
};

const removeImage = async (req, res) => {
  try {
    const user = await Customer.findById(req.user_id);
    if (!user) {
      return res.Response(404, "User not found");
    }
    user.image =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    user.save();
    res.Response(200, null, user);
  } catch (error) {
    res.Response(500, "Internal server error");
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateImage,
  removeImage,
};
