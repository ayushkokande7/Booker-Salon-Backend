const rootRouter = require("express").Router();
const customer = require("./customer");

rootRouter.use("/customer", customer);

module.exports = rootRouter;
