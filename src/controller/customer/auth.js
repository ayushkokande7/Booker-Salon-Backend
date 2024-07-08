const jwt = require("jsonwebtoken");
const Customer = require("../../models/customer");
const generateOTP = require("../../utils/generateOTP");

const login = async (req, res) => {
  try {
    const { mobile, FCM_token } = req.body;
    if (!mobile) throw new Error("Enter mobile number");
    if (mobile.toString().length !== 10)
      throw new Error("Invalid mobile number");
    const OTP = generateOTP();
    const user = await Customer.findOne({ mobile: mobile });
    if (!user) {
      await Customer.create({ mobile, OTP, FCM_token });
    } else {
      user.OTP = OTP;
      user.FCM_token = FCM_token;
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
    const user = await Customer.findOne({ mobile: mobile });
    if (!user) throw new Error("User not found");
    if (user.OTP !== OTP) throw new Error("Invalid OTP");
    const token = jwt.sign(
      { user_id: user._id, role: "customer" },
      process.env.CUSTOMER_SECRET_KEY,
      {
        expiresIn: "5d",
      }
    );
    await user.updateOne({ JWT: token, OTP: null });
    user.save();
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
