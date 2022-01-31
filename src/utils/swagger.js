const { portPicker } = require("../utils/port");
const PORT = portPicker() || 3333;
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const outputFile = "./src/swagger.json";

const endpointsFiles = ["./src/server.js"];

const doc = {
  info: {
    title: "My API",
    description: "DEVinBank - Conta 365",
  },
  tags: [
    {
      name: "User",
      description: "Endpoints",
    },
    {
      name: "Finance",
      description: "Endpoints",
    },
  ],
  servers: [
    {
      url: `http://localhost:${PORT}/`,
      description: "Development server",
      templates: {
        scheme: {
          enum: ["http", "https"],
          default: "http",
        },
      },
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
