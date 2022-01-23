const usersDb = require("../database/users.json");
const fs = require("fs");

module.exports = {
  getUserById(id) {
    const user = usersDb.filter(item => item.id === Number(id));
    return user;
  },
  getUsersDatabase(filename) {
    const response = fs.readFileSync(`src/database/${filename}`, "utf-8");
    return JSON.parse(response);
  },
};
