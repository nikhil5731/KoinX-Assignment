const Transaction = require("../models/transaction");
const EthereumPrice = require("../models/ethereumPrice");
const BigNumber = require("bignumber.js");

exports.getUserExpenses = async (req, res) => {
  try {
    const { address } = req.params;

    // Fetch all transactions for the given address
    const transactions = await Transaction.find({ address });

    // Calculate total expenses
    const totalExpenses = transactions.reduce((sum, tx) => {
      const gasUsed = new BigNumber(tx.gasUsed);
      const gasPrice = new BigNumber(tx.gasPrice);
      const expense = gasUsed
        .multipliedBy(gasPrice)
        .dividedBy(new BigNumber(10).pow(18));
      return sum.plus(expense);
    }, new BigNumber(0));

    // Fetch the latest Ethereum price
    const latestPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });

    if (!latestPrice) {
      throw new Error("No Ethereum price data available");
    }

    res.json({
      address,
      totalExpenses: totalExpenses + " ETH",
      currentEtherPrice: latestPrice.price,
      currency: "INR",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
