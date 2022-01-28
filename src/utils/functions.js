const fs = require("fs");

function writeDatabase(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`src/database/${filename}`, data, "utf-8");
}

const removeFile = path => {
  fs.rmSync(`${path}`, {
    recursive: true,
    force: true,
  });
};

module.exports = { writeDatabase, removeFile };
