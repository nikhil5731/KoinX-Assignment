const axios = require("axios");
const cron = require("node-cron");
const EthereumPrice = require("../models/ethereumPrice");

const fetchAndStoreEthereumPrice = async () => {
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

    const price = response.data.ethereum.inr;

    // Fetch the last stored price from the database
    const lastPriceEntry = await EthereumPrice.findOne().sort({
      createdAt: -1,
    });

    if (lastPriceEntry) {
      // Check if the new price is different from the last stored price
      if (lastPriceEntry.price !== price) {
        // Update the existing record with the new price
        lastPriceEntry.price = price;
        await lastPriceEntry.save();
        console.log(`Ethereum price updated: ₹${price}`);
      } else {
        console.log("Price has not changed, no need to update.");
      }
    } else {
      // If no previous price exists, create a new record
      const ethereumPrice = new EthereumPrice({ price });
      await ethereumPrice.save();
      console.log(`Ethereum price stored: ₹${price}`);
    }
  } catch (error) {
    console.error("Error fetching and storing Ethereum price:", error);
  }
};

const startEthereumPriceJob = () => {
  // Schedule the job to run every 10 minutes
  cron.schedule("*/10 * * * *", fetchAndStoreEthereumPrice);
  console.log("Ethereum price fetching job scheduled");
};

module.exports = {
  fetchAndStoreEthereumPrice,
  startEthereumPriceJob,
};
