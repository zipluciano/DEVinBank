const usersDb = require("../database/users.json");
const fs = require("fs");

module.exports = {
  async getUserById(id) {
    const user = await usersDb.filter(item => item.id === Number(id));
    return user;
  },
  getUsersDatabase(filename) {
    const response = fs.readFileSync(`src/database/${filename}`, "utf-8");
    return JSON.parse(response);
  },
  writeDatabase(filename, rawData) {
    const data = JSON.stringify(rawData);
    fs.writeFileSync(`src/database/${filename}`, data, "utf-8");
  },
};
