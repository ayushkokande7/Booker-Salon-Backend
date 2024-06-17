const rootRouter = require("express").Router();
const customer = require("./customer");
const jober = require("./jober");
const owner = require("./owner");

rootRouter.get("/", (req, res) => {
  res.send("Hello World");
});
rootRouter.use("/customer", customer);
rootRouter.use("/jober", jober);
rootRouter.use("/owner", owner);

module.exports = rootRouter;
