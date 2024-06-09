const Owner = require("../../models/owner");
const Jober = require("../../models/jober");
const generateOTP = require("../../utils/generateOTP");

const getAllJober = async (req, res) => {
  try {
    const owner = await Owner.findById(req.user_id).populate("jobers");
    return res.Response(200, null, owner.jobers);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const removeJober = async (req, res) => {
  try {
    const { joberId, mobile } = req.body;
    const jober = await Jober.findById(joberId);
    if (!jober) return res.Response(404, "Jober not found");
    if (jober.mobile !== mobile)
      return res.Response(400, "Invalid mobile number");
    jober.owner_id = null;
    jober.booking_status = false;
    jober.save();
    await Owner.findByIdAndUpdate(req.user_id, {
      $pull: { jobers: jober._id },
    });
    return res.Response(200, "Jober removed successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const ViewJoberForAdd = async (req, res) => {
  try {
    const { mobile, joberId } = req.body;
    const jober = await Jober.findOne({ mobile, jober_id: joberId }).select(
      "fname",
      "lname",
      "image",
      "age",
      "gender"
    );
    if (!jober) return res.Response(404, "Jober not found");
    return res.Response(200, null, jober);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;
    const jober = await Jober.findOne({ mobile });
    if (!jober) return res.Response(404, "Jober not found");
    const OTP = generateOTP();
    jober.OTP = OTP;
    jober.save();
    return res.Response(200, "OTP sent successfully to Jober", OTP);
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { mobile, OTP } = req.body;
    if (!OTP) throw new Error("Enter OTP");
    const jober = await Jober.findOne({ mobile });
    if (!jober) throw new Error("Jober not found");
    if (jober.OTP !== OTP) throw new Error("Invalid OTP");
    jober.owner_id = req.user_id;
    jober.save();
    await Owner.findByIdAndUpdate(req.user_id, {
      $push: { jobers: jober._id },
    });
    res.Response(200, "Jober verified successfully");
  } catch (error) {
    console.log(error);
    res.Response(500, "Internal server error");
  }
};

module.exports = {
  getAllJober,
  ViewJoberForAdd,
  sendOTP,
  verifyOTP,
  removeJober,
};
