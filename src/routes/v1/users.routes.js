const express = require("express");
const usersRoutes = express.Router();
const usersController = require("../../controllers/usersController");

usersRoutes.post(
  "/user",
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to create a user in database'
  usersController.createUser
);
usersRoutes.patch(
  "/user/:id",
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to update infos of a specific user'
  usersController.updateUser
);
usersRoutes.get(
  "/user/:id",
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to get infos of a specific user'
  /*  #swagger.parameters['id'] = {
                in: 'path',
                type: 'integer',
                schema: { $ref: "#/definitions/User" }
        } */
  usersController.requestedUser
);

module.exports = usersRoutes;
