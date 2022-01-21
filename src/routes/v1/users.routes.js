const express = require("express");
const usersRoutes = express.Router();
const usersController = require("../../controllers/usersController");

usersRoutes.get("/user/:id", usersController.requestedUser);
usersRoutes.patch("/user/:id", usersController.updateUser);

module.exports = usersRoutes;
