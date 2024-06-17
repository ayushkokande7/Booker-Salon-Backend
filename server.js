const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const { firebase } = require("./src/firebase");
const Api = require("./src/routes");
const customResponse = require("./src/middlewares/response");
const DB = require("./src/config/DB");
require("dotenv").config();
DB();
app.use(cors());
app.use(express.json());
app.use(customResponse);
app.use("/api", Api);

const sendFirebaseToken = async (req, res) => {
  try {
    const a = await firebase.messaging().send({
      token:
        "cBQrtMdnQi-smo_5jemhZt:APA91bHoBGUTFGrwhSdqAKl36h8r3UzMu0Al9ZGqgfF-xvzbU_sDlZQlTf_mVBFH7m4v3YO0qm1mfjHlQGtCz3-19wjKhMWc58PEVHg1TAUi0w3GMdASMWcvbK34lmyMnfa7M_CEmLWb",
      notification: {
        title: "BookerSalon",
        body: "Your booking has been approved",
      },
    });
    console.log("toni", a);
  } catch (error) {
    console.log(error);
  }
};
// sendFirebaseToken();
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
