const router = require("express").Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
const Auth = require("../controller/customer/auth");
const Profile = require("../controller/customer/profile");
const Map = require("../controller/customer/map");
const Favourite = require("../controller/customer/favourite");
const Booking = require("../controller/customer/booking");
const Review = require("../controller/customer/review");

router.post("/login", Auth.login);
router.post("/verifyOTP", Auth.verifyOTP);

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
  .route("/favourite")
  .all(authenticateJWT)
  .get(Favourite.getFavourites)
  .post(Favourite.favourite);

router
  .route("/booking")
  .all(authenticateJWT)
  .get(Booking.getBooking)
  .post(Booking.scheduleBooking)
  .delete(Booking.cancelBooking);

router
  .route("/review")
  .all(authenticateJWT)
  .get(Review.getReview)
  .put(Review.updateReview)
  .post(Review.addReview)
  .delete(Review.deleteReview);

router.get("/shops", authenticateJWT, Map.nearbyShops);
router.get("/jober", authenticateJWT, Map.nearbyJober);

module.exports = router;
