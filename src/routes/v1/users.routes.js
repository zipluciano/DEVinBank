const express = require("express");
const usersRoutes = express.Router();
const usersController = require("../../controllers/usersController");

usersRoutes.post("/user", usersController.createUser);
usersRoutes.patch("/user/:id", usersController.updateUser);
usersRoutes.get("/user/:id", usersController.requestedUser);

module.exports = usersRoutes;
