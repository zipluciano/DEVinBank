const usersDb = require("../database/users.json");

module.exports = {
  async getUserById(id) {
    const user = await usersDb.filter(item => item.id === Number(id));
    return user;
  },
};
