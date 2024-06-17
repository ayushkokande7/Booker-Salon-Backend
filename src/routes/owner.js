const router = require("express").Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
const Auth = require("../controller/owner/auth");
const Service = require("../controller/owner/services");
const Profile = require("../controller/owner/profile");
const AddJober = require("../controller/owner/addJober");

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
  .route("/service")
  .all(authenticateJWT)
  .get(Service.getServices)
  .put(Service.editServices)
  .post(Service.addServices)
  .delete(Service.deleteServices);

router
  .route("/jober")
  .all(authenticateJWT)
  .get(AddJober.getAllJober)
  .delete(AddJober.removeJober);

router
  .route("/addjober")
  .all(authenticateJWT)
  .put(AddJober.ViewJoberForAdd)
  .post(AddJober.sendOTP);

// router.post("/verifyOTP", authenticateJWT, AddJober.verifyOTP);

module.exports = router;
