const express = require("express");
const port = 3000;
const app = express();
const { firebase } = require("./src/firebase");
const Api = require("./src/routes");
const customResponse = require("./src/middlewares/response");
require("dotenv").config();
// const bodyParser = require("body-parser");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use(bodyParser.json());
app.use(express.json());
app.use(customResponse);
app.use("/api", Api);

// const sendFirebaseToken = async (req, res) => {
//   try {
//     await firebase.messaging().send({
//       token: "",
//       notification: {
//         title: "BookerSalon",
//         body: "Your booking has been approved",
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
