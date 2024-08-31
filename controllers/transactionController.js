const axios = require("axios");
const Transaction = require("../models/transaction.js");

exports.getTransactions = async (req, res) => {
  try {
    const { address } = req.params;

    // Fetch transactions from Etherscan API
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    );

    if (response.data.status !== "1") {
      throw new Error(
        response.data.message || "Error fetching transactions from Etherscan"
      );
    }

    const transactions = response.data.result;

    // Store transactions in MongoDB
    const savedTransactions = await Promise.all(
      transactions.map(async (tx) => {
        const transactionData = {
          address: address,
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          gas: parseInt(tx.gas),
          gasPrice: tx.gasPrice,
          gasUsed: parseInt(tx.gasUsed),
          blockNumber: parseInt(tx.blockNumber),
          timeStamp: parseInt(tx.timeStamp),
        };

        const savedTransaction = await Transaction.findOneAndUpdate(
          { hash: tx.hash }, // find a document with this filter
          transactionData, // document to insert when nothing was found
          {
            new: true, // return the updated document
            upsert: true, // insert a new document if nothing was found
            setDefaultsOnInsert: true,
            runValidators: true,
          }
        );

        return savedTransaction;
      })
    );

    res.json(savedTransactions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
