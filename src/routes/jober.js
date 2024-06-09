const router = require("express").Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
const Auth = require("../controller/jober/auth");
const Profile = require("../controller/jober/profile");
const Booking = require("../controller/jober/booking");

router.use("/login", Auth.login);
router.use("/verifyOTP", Auth.verifyOTP);

router
  .route("/profile")
  .all(authenticateJWT)
  .get(Profile.getProfile)
  .put(Profile.updateProfile);

router
  .route("/profile/image")
  .all(authenticateJWT)
  .put(Profile.updateImage)
  .delete(Profile.removeImage);

router
  .route("/booking")
  .all(authenticateJWT)
  .get(Booking.onOffBooking)
  .post(Booking.unlinkShop);

module.exports = router;
