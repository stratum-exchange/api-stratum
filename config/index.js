require('dotenv').config()

const config = {

  testnet: process.env.TESTNET,

  web3: {
    provider: process.env.PROVIDER
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: PROCESS.ENV.REDIS_PASSWORD
  },

  tokenLists: [
    //'https://raw.githubusercontent.com/meterio/token-list/master/generated/swap-tokens.json'
  ],

  wmtr: {
    "id": 2,
    "chainId": 83,
    "name": "Wrapped MTR",
    "symbol": "WMTR",
    "address": "0x55E22D0dDD17FDd3F5bB2A87E8bea1f81FAcBe63",
    "decimals": 18,
    "logoURI": "https://raw.githubusercontent.com/meterio/token-list/master/data/MTR/logo.png",
    "isWhitelisted": true,
    "isDisplay": true,
    "whiteTime": "2022-04-01T09:48:00Z"
  },
  mtrg: {
    "id": 6,
    "chainId": 83,
    "name": "Meter Governance",
    "symbol": "MTRG",
    "address": "0x8A419Ef4941355476cf04933E90Bf3bbF2F73814",
    "decimals": 18,
    "logoURI": "https://raw.githubusercontent.com/meterio/token-list/master/data/MTRG/logo.png",
    "isWhitelisted": true,
    "isDisplay": true,
    "whiteTime": "2022-04-01T09:48:00Z"
  },
  solidly: {
    "id": 8,
    "chainId": 83,
    "name": "Solidly",
    "symbol": "SOLID",
    "address": "0x12A498f996AaCcd88607138c775B10D6B454C5A6",
    "decimals": 18,
    "logoURI": "https://raw.githubusercontent.com/meterio/token-list/master/data/MTR/logo.png",
    "isWhitelisted": true,
    "isDisplay": true,
    "whiteTime": "2022-04-01T09:48:00Z"
  },
  usdc: {
    "id": 3,
    "chainId": 83,
    "name": "USD Coin",
    "symbol": "USDC",
    "address": "0x8B404Df32c784f0ce7c3474Df7E75C8A2DAee6e5",
    "decimals": 6,
    "logoURI": "https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/logo.png",
    "isWhitelisted": true,
    "isDisplay": true,
    "whiteTime": "2022-04-01T09:48:00Z"
  },
  usdt: {
    "id": 1,
    "chainId": 83,
    "name": "Tether USD",
    "symbol": "USDT",
    "address": "0x7D071377D1F76B4F5a91df464EF3d8391d07b8F0",
    "decimals": 6,
    "logoURI": "https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png",
    "isWhitelisted": true,
    "isDisplay": true,
    "whiteTime": "2022-04-01T09:48:00Z"
  }

}


module.exports = config
