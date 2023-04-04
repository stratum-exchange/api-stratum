require("dotenv").config();

const config = {
  testnet: process.env.TESTNET,
  chainId: process.env.CHAINID,

  web3: {
    provider: process.env.PROVIDER,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: PROCESS.ENV.REDIS_PASSWORD
  },

  tokenLists: [
    //'https://raw.githubusercontent.com/meterio/token-list/master/generated/swap-tokens.json'
  ],

  // wmtr: {
  //   "id": 2,
  //   "chainId": 83,
  //   "name": "Wrapped MTR",
  //   "symbol": "WMTR",
  //   "address": "0x55E22D0dDD17FDd3F5bB2A87E8bea1f81FAcBe63",
  //   "decimals": 18,
  //   "logoURI": "https://raw.githubusercontent.com/meterio/token-list/master/data/MTR/logo.png",
  //   "isWhitelisted": true,
  //   "isDisplay": true,
  //   "whiteTime": "2022-04-01T09:48:00Z"
  // },
  // mtrg: {
  //   "id": 6,
  //   "chainId": 83,
  //   "name": "Meter Governance",
  //   "symbol": "MTRG",
  //   "address": "0x8A419Ef4941355476cf04933E90Bf3bbF2F73814",
  //   "decimals": 18,
  //   "logoURI": "https://raw.githubusercontent.com/meterio/token-list/master/data/MTRG/logo.png",
  //   "isWhitelisted": true,
  //   "isDisplay": true,
  //   "whiteTime": "2022-04-01T09:48:00Z"
  // },
  stratum: {
    id: 8,
    chainId: 280,
    name: "Stratum",
    symbol: "STRAT",
    address: "0x687407d7542E2C28f739bB5c4b4f8B3c5930ad99",
    decimals: 18,
    logoURI: "https://stratumexchange.com/favicon.png",
    isWhitelisted: true,
    isDisplay: true,
    whiteTime: "2022-04-01T09:48:00Z",
  },
  usdc: {
    id: 3,
    chainId: 280,
    name: "USD Coin",
    symbol: "USDC",
    address: "0x0faF6df7054946141266420b43783387A78d82A9",
    decimals: 6,
    logoURI:
      "https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/logo.png",
    isWhitelisted: true,
    isDisplay: true,
    whiteTime: "2022-04-01T09:48:00Z",
  },
  dai: {
    id: 1,
    chainId: 280,
    name: "Dai",
    symbol: "DAI",
    address: "0x7D071377D1F76B4F5a91df464EF3d8391d07b8F0",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/large/4943.png?1636636734",
    isWhitelisted: true,
    isDisplay: true,
    whiteTime: "2022-04-01T09:48:00Z",
  },
};

module.exports = config;
