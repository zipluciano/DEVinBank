const express = require("express");
const routes = express.Router();
const usersRoutes = require("./v1/users.routes");
const financeRoutes = require("./v1/finance.routes");

routes.use("/api", [usersRoutes, financeRoutes]);

module.exports = routes;
