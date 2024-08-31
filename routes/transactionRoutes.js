const express = require("express");
const transactionController = require("../controllers/transactionController.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );

    if (
      !response.data ||
      !response.data.ethereum ||
      !response.data.ethereum.inr
    ) {
      throw new Error("Invalid response from CoinGecko API");
    }
    return res.json({
      message: "KoinX Backend Assignment",
      Etherium: "Rs. " + response.data.ethereum.inr,
    });
  } catch (error) {}
});
router.get("/transactions/:address", transactionController.getTransactions);

module.exports = router;
