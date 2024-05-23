const jwt = require("jsonwebtoken");

function checkUserType(role) {
  if (role === "customer") return process.env.CUSTOMER_SECRET_KEY;
  else if (role === "jober") return process.env.JOBER_SECRET_KEY;
  else if (role === "owner") return process.env.OWNER_SECRET_KEY;
}

module.exports = (req, res, next) => {
  const token = req.header("x-auth");
  if (!token) {
    return res.Response(401, "Authorization Denied");
  }
  try {
    const user = jwt.decode(token);
    const decoded = jwt.verify(token, checkUserType(user.role));
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.Response(401, "Invalid Token");
  }
};
