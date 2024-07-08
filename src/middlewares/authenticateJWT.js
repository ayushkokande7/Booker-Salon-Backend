const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Jober = require("../models/jober");
const Owner = require("../models/owner");
function checkUserType(role) {
  if (role === "customer") return process.env.CUSTOMER_SECRET_KEY;
  else if (role === "jober") return process.env.JOBER_SECRET_KEY;
  else if (role === "owner") return process.env.OWNER_SECRET_KEY;
}

const findUser = async (user, token) => {
  try {
    if (user.role === "customer") {
      var customer = await Customer.findById(user.user_id);
    } else if (user.role === "jober") {
      var customer = await Jober.findById(user.user_id);
    } else {
      var customer = await Owner.findById(user.user_id);
    }
    const newToken = jwt.sign(
      { user_id: customer._id, role: user.role },
      checkUserType(user.role),
      {
        expiresIn: "5m",
      }
    );
    if (!customer || customer.JWT !== token) {
      throw new Error("Invalid User Token");
    }
    customer.JWT = newToken;
    customer.save();
    return newToken;
  } catch (err) {
    throw err;
  }
};

module.exports = async (req, res, next) => {
  const token = req.header("x-auth");
  if (!token) {
    return res.Response(401, "Authorization Denied");
  }
  try {
    const user = jwt.decode(token);
    const decoded = jwt.verify(token, checkUserType(user.role), {
      ignoreExpiration: true,
    });
    const tokenExpired = decoded.exp < Date.now() / 1000;
    if (tokenExpired) {
      const newToken = await findUser(user, token);
      res.setHeader("x-auth-new", newToken);
    }
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.Response(401, "Invalid Token");
  }
};
