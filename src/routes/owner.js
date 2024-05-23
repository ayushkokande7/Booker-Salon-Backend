const router = require("express").Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
const Auth = require("../controller/owner/auth");
const Service = require("../controller/owner/services");

router.post("/login", Auth.login);
router.post("/verifyOTP", Auth.verifyOTP);

router
  .route("/service")
  .all(authenticateJWT)
  .get(Service.getServices)
  .put(Service.editServices)
  .post(Service.addServices)
  .delete(Service.deleteServices);

module.exports = router;
