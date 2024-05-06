const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { name, role } = req.body;
    const payload = { name, role };
    jwt.sign(payload, process.env.CUSTOMER_SECRET_KEY, (err, token) => {
      res.Response(200, "working login", token);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
};
