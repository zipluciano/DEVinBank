const express = require("express");
const financialRoutes = express.Router();
const financialController = require("../../controllers/financialController");

financialRoutes.get("/helloFinancial", financialController.hello);

module.exports = financialRoutes;
