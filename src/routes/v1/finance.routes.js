const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/tests");
  },
  filename: (req, file, cb) => {
    const filename = `${req.params.userId}--` + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
const financeRoutes = express.Router();
const financeController = require("../../controllers/financeController");

financeRoutes.post(
  "/finance/:userId",
  upload.single("finance"),
  financeController.sendFile
);

module.exports = financeRoutes;
