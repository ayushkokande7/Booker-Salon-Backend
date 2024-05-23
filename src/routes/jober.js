const router = require("express").Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
const Auth = require("../controller/jober/auth");

router.use("/login", Auth.login);
router.use("/verifyOTP", Auth.verifyOTP);

module.exports = router;
