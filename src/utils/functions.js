const fs = require("fs");

function writeDatabase(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`src/database/${filename}`, data, "utf-8");
}

module.exports = { writeDatabase };
