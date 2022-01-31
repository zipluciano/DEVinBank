const { getUserById } = require("../../../services/users.service");
const {
  getFinanceDatabase,
  getUserFinancesById,
} = require("../../../services/finance.service");
const { removeFile, writeDatabase } = require("../../../utils/functions");
const { typesOfExpenses } = require("../../../utils/constants");
const XLSX = require("xlsx");

async function sendFile(req, res) {
  // #swagger.tags.name = ['Finance']
  // #swagger.description = 'Endpoint to send xlsx files and create user finance data'
  const { userId } = await req.params;
  const excelFilePath = `src/database/sheets/${userId}_financeFile.xlsx`;
  let dataChecking;
  try {
    if (!getUserById(userId).length) {
      throw new Error("❌ The requested user doesn't exists in database");
    }
    const excelFile = XLSX.readFile(excelFilePath);
    const parsedFile = XLSX.utils.sheet_to_json(
      excelFile.Sheets[excelFile.SheetNames]
    );

    const columnNamesRef = JSON.stringify([
      "price",
      "typesOfExpenses",
      "date",
      "name",
    ]);
    for (let i = 0; i < parsedFile.length; i++) {
      if (JSON.stringify(Object.keys(parsedFile[i])) !== columnNamesRef) {
        throw new Error(
          `❌ Your file has missing or extra data in line: ${i + 2}`
        );
      }
    }

    dataChecking = parsedFile
      .map((item, index) => {
        const check = JSON.stringify({
          price: "✅ Correct data",
          typesOfExpenses: "✅ Correct data",
          date: "✅ Correct data",
        });
        const eval = {
          price:
            typeof item.price === "number"
              ? "✅ Correct data"
              : "❌ Wrong data",
          typesOfExpenses:
            typeof item.typesOfExpenses === "string" &&
            typesOfExpenses.includes(item.typesOfExpenses.toLowerCase())
              ? "✅ Correct data"
              : "❌ Wrong data",
          date:
            typeof item.date === "number" ? "✅ Correct data" : "❌ Wrong data",
        };
        if (JSON.stringify(eval) === check) {
          return null;
        }
        return { excelLine: index + 2, ...eval };
      })
      .filter(item => {
        if (item !== null) {
          return item;
        }
      });

    if (dataChecking.length) {
      throw dataChecking;
    }

    const financeDatabase = getFinanceDatabase("finance.json");
    const financeDatabaseUpdatable = !financeDatabase.length
      ? []
      : financeDatabase.filter(item => item.userId !== Number(userId));
    const hasUserFinance = Boolean(
      !financeDatabase
        ? false
        : financeDatabase
            .map(item => item.userId === Number(userId))
            .filter(item => item).length
    );
    const [userFinance] = getUserFinancesById(userId);
    const newUserFinance = {
      id: financeDatabase.length
        ? financeDatabase[financeDatabase.length - 1].id + 1
        : 1,
      userId: Number(userId),
    };

    let dateReadyData;

    if (hasUserFinance) {
      dateReadyData = parsedFile.map((item, index) => {
        const decodedDate = XLSX.SSF.parse_date_code(item.date);
        const date = `${decodedDate["d"]}/${decodedDate["m"]}/${decodedDate["y"]}`;
        const { financialData } = userFinance;
        const lastId = !financialData.length
          ? 0
          : financialData[financialData.length - 1].id;
        return { id: index + lastId + 1, ...item, date };
      });
    } else {
      dateReadyData = parsedFile.map((item, index) => {
        const decodedDate = XLSX.SSF.parse_date_code(item.date);
        const date = `${decodedDate["d"]}/${decodedDate["m"]}/${decodedDate["y"]}`;
        return { id: index + 1, ...item, date };
      });
    }

    if (hasUserFinance) {
      financeDatabaseUpdatable.push({
        ...userFinance,
        financialData: [...userFinance.financialData, ...dateReadyData],
      });
      writeDatabase("finance.json", financeDatabaseUpdatable);
    } else {
      financeDatabaseUpdatable.push({
        ...newUserFinance,
        financialData: dateReadyData,
      });
      writeDatabase("finance.json", financeDatabaseUpdatable);
    }

    removeFile(excelFilePath);
    res.status(201).json({ message: "🚀 The file was sended to the database" });
    console.log("🚀 The file was sended to the database");
  } catch (error) {
    removeFile(excelFilePath);
    res.status(401).json({
      errorMessage: error.message,
      errors: dataChecking,
    });
    console.log("❌ The file data wasn't sended to the database");
  }
}

module.exports = sendFile;
