const Auth = require("./auth");
const router = require("express").Router();
const JWT = require("../../middlewares/JWT");

router.use("/auth", Auth);
router.get("/auth", JWT, (req, res) => {
  res.Response(200, "working", req.user_id);
});
module.exports = router;
