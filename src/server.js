const express = require("express");
const app = express();
const { portPicker } = require("./utils/port");
const PORT = portPicker() || 3333;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
