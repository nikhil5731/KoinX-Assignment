const express = require("express");
const axios = require("axios");
const transactionController = require("../controllers/transactionController.js");
const EthereumPrice = require("../models/ethereumPrice.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const transactions = await EthereumPrice.find();

    return res.json({
      message: "KoinX Backend Assignment",
      Ethereum: transactions[0].price
        ? "Rs." + transactions[0].price
        : "Not Found in Database!",
    });
  } catch (error) {
    return res.json({ Error: error });
  }
});
router.get("/transactions/:address", transactionController.getTransactions);

module.exports = router;
