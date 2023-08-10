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
    password: process.env.REDIS_PASSWORD,
  },

  tokenLists: [
    //'https://raw.githubusercontent.com/meterio/token-list/master/generated/swap-tokens.json'
  ],
  routeAssets: [],
  files: {
    airdrop: process.env.AIRDROP_URL,
    tokenlists: process.env.TOKENLISTS_URL,
  },
};

config.routeAssets = JSON.parse(
  fs.readFileSync(
    `constants/${config.chain.toLowerCase()}/routeAssets${
      config.testnet ? "Testnet" : ""
    }.json`
  )
);

module.exports = config;
