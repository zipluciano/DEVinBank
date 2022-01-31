const { getUserById } = require("../../services/users.service");
const express = require("express");
const financeRoutes = express.Router();
const financeController = require("../../controllers/financeController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/database/sheets");
  },
  filename: (req, file, cb) => {
    const { userId } = req.params;
    const filename = `${userId}_financeFile.xlsx`;
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  const { userId } = req.params;
  if (getUserById(userId).length) {
    cb(null, true);
  } else {
    cb(new Error("❌ The requested user doesn't exists in database"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

financeRoutes.post(
  "/finance/:userId",
  upload.single("finance"),
  // #swagger.tags = ['Finance']
  // #swagger.description = 'Endpoint to create a finance database of a existent user and fill it with infos of a sended xlsx file'
  financeController.sendFile
);
financeRoutes.delete(
  "/finance/:userId/:financialId",
  // #swagger.tags = ['Finance']
  // #swagger.description = 'Endpoint to delete financial data of a specific user'
  financeController.deleteFinance
);

module.exports = financeRoutes;
