const { getFinanceDatabase } = require("../../../services/finance.service");
const { writeDatabase } = require("../../../utils/functions");

async function deleteFinance(req, res) {
  try {
    const { userId, financialId } = req.params;
    const financeDatabase = getFinanceDatabase("finance.json");
    const userFinanceData = financeDatabase
      .map(item => {
        return item.userId === Number(userId) ? item : null;
      })
      .filter(item => item);
    const hasUser = Boolean(userFinanceData.length);

    let hasFinanceData;
    if (hasUser) {
      const { financialData } = userFinanceData[0];
      hasFinanceData = Boolean(
        financialData
          .map(item => {
            return item.id === Number(financialId);
          })
          .filter(item => item).length
      );
    } else {
      throw new Error("❌ The user doesn't exists in database");
    }

    if (!hasFinanceData) {
      throw new Error("❌ The financial id doesn't exists in user database");
    }

    const newFinancialData = userFinanceData[0].financialData.filter(
      item => item.id !== Number(financialId)
    );
    const newUserFinanceData = {
      ...userFinanceData[0],
      financialData: newFinancialData,
    };

    const financeDatabaseUpdatable = financeDatabase.filter(
      item => item.userId !== Number(userId)
    );
    financeDatabaseUpdatable.push(newUserFinanceData);
    writeDatabase("finance.json", financeDatabaseUpdatable);

    console.log("✅ User finance database was updated");
    res.status(201).json({ message: "✅ User finance database was updated" });
  } catch (error) {
    res.status(401).json({
      errorMessage: error.message,
    });
  }
}

module.exports = deleteFinance;
