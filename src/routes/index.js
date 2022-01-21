const express = require("express");
const routes = express.Router();
const usersRoutes = require("./v1/users.routes");
const financialRoutes = require("./v1/financial.routes");

routes.use("/api", [usersRoutes, financialRoutes]);

module.exports = routes;
