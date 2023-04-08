require("dotenv").config();
const fs = require("fs");

const config = {
  testnet: process.env.TESTNET,
  chainId: process.env.CHAINID,
  chain: process.env.CHAIN,

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
  routeAssets: [],
};

config.routeAssets = JSON.parse(
  fs.readFileSync(
    `constants/${config.chain.toLowerCase()}/routeAssets${
      config.testnet ? "Testnet" : ""
    }.json`
  )
);

module.exports = config;
