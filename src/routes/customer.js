const router = require("express").Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
const Auth = require("../controller/customer/auth");
const Profile = require("../controller/customer/profile");
const Map = require("../controller/customer/map");
const Favourite = require("../controller/customer/favourite");

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

router.get("/map", authenticateJWT, Map.nearbyShops);

module.exports = router;
