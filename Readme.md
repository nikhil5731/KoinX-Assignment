# Ethereum Transaction and Expense Tracking API

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Background Jobs](#background-jobs)
9. [Future Improvements](#future-improvements)

## Introduction

This project is a Node.js-based API that fetches and stores Ethereum transactions for specified addresses, tracks Ethereum prices, and calculates user expenses. It uses the Etherscan API to fetch transaction data and the CoinGecko API to fetch Ethereum prices.

## Features

- Fetch and store Ethereum transactions for a given address
- Periodically fetch and store Ethereum prices
- Calculate total expenses for a given Ethereum address
- Provide current Ethereum price in INR

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB (v4+ recommended)
- npm (v6+ recommended)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/ethereum-transaction-api.git
   cd ethereum-transaction-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following content:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ethereum_transactions
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

2. Replace `your_etherscan_api_key` with your actual Etherscan API key.

## API Endpoints

1. **Fetch Transactions**

   - Endpoint: `GET /api/transactions/:address`
   - Description: Fetches and stores transactions for the given Ethereum address
   - Parameters:
     - `address`: Ethereum address (e.g., 0xce94e5621a5f7068253c42558c147480f38b5e0d)
   - Response: Array of transaction objects

2. **Get User Expenses**
   - Endpoint: `GET /api/expenses/:address`
   - Description: Calculates total expenses and provides current Ethereum price for the given address
   - Parameters:
     - `address`: Ethereum address
   - Response:
     ```json
     {
       "address": "0x...",
       "totalExpenses": "0.123456789",
       "currentEtherPrice": 150000.0,
       "currency": "INR"
     }
     ```
3. **Get Current Ethereum Price**

- Endpoint: `GET /api/`
- Description: Current Ethereum Price
- Response:
  ```json
  {
    "message": "KoinX Backend Assignment",
    "Ethereum": "Rs.209593"
  }
  ```

## Database Schema

### Transaction Schema

```javascript
{
  address: String,
  hash: String,
  from: String,
  to: String,
  value: String,
  gas: Number,
  gasPrice: String,
  gasUsed: Number,
  blockNumber: Number,
  timeStamp: Number
}
```

### EthereumPrice Schema

```javascript
{
  price: Number,
  timestamp: Date
}
```

## Background Jobs

The API runs a background job to fetch the current Ethereum price every 10 seconds (configurable). This job is initiated when the server starts.


## Future Improvements

- Implement user authentication and authorization
- Add pagination for transaction fetching
- Implement caching to reduce API calls and improve performance
- Add more comprehensive error handling and logging
- Implement rate limiting to prevent API abuse
