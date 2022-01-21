const express = require("express");
const app = express();
const cors = require("cors");
const { portPicker } = require("./utils/port");
const PORT = portPicker() || 3333;
const routes = require("./routes");

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
