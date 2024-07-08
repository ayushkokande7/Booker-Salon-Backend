const jwt = require("jsonwebtoken");
const Jober = require("../../models/jober");
const generateOTP = require("../../utils/generateOTP");
const login = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) throw new Error("Enter mobile number");
    if (mobile.toString().length !== 10)
      throw new Error("Invalid mobile number");
    const OTP = generateOTP();
    const user = await Jober.findOne({ mobile: mobile });
    if (!user) {
      await Jober.create({ mobile, OTP });
    } else {
      user.OTP = OTP;
      user.save();
    }
    return res.Response(200, "OTP sent successfully", OTP);
  } catch (error) {
    return res.Response(400, error.message);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { mobile, OTP } = req.body;
    if (!mobile || !OTP) throw new Error("Invalid data");
    const user = await Jober.findOne({ mobile: mobile });
    if (!user) throw new Error("User not found");
    if (user.OTP !== OTP) throw new Error("Invalid OTP");
    const token = jwt.sign(
      { user_id: user._id, role: "jober" },
      process.env.JOBER_SECRET_KEY,
      {
        expiresIn: "60d",
      }
    );
    await user.updateOne({ JWT: token, OTP: null });
    await user.save();
    return res.Response(200, "OTP verified successfully", {
      user: user,
      token: token,
    });
  } catch (error) {
    return res.Response(400, error.message);
  }
};

module.exports = {
  login,
  verifyOTP,
};
