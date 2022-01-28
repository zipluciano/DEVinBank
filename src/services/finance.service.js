const financeDb = require("../database/finance.json");
const fs = require("fs");

module.exports = {
  getUserFinancesById(id) {
    const userFinance = financeDb.filter(item => item.userId === Number(id));
    return userFinance;
  },
  getFinanceDatabase(filename) {
    const response = fs.readFileSync(`src/database/${filename}`, "utf-8");
    return JSON.parse(response);
  },
};
