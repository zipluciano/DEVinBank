const process = require("dotenv").config();
const portPicker = () => {
  try {
    return process.parsed.PORT;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { portPicker };
