const rootRouter = require("express").Router();
const customer = require("./customer");
const jober = require("./jober");
const owner = require("./owner");

rootRouter.use("/customer", customer);
rootRouter.use("/jober", jober);
rootRouter.use("/owner", owner);

module.exports = rootRouter;
