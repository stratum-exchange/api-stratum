const config = require("../config");
const redisHelper = require("redis");

const Web3 = require("web3");
const Multicall = require("@dopex-io/web3-multicall");

let CONTRACTS = null;
let tokenlistpath = null;
if (config.testnet === "1") {
  CONTRACTS = require(`../constants/${config.chain.toLowerCase()}/contractsTestnet.js`);
  tokenlistpath = `constants/${config.chain.toLowerCase()}/testnet-token-list.json`;
} else {
  CONTRACTS = require(`../constants/${config.chain.toLowerCase()}/contracts.js`);
  tokenlistpath = `../constants/${config.chain.toLowerCase()}/token-list.json`;
}

exports.chainPriceInStables = async (token) => {
  if (
    token.address?.toLowerCase() ===
    CONTRACTS.STABLE_TOKEN_ADDRESS.toLowerCase()
  ) {
    return 1.0;
  }
  let amount = 0;
  const stablecoin = await findToken(CONTRACTS.STABLE_TOKEN_ADDRESS);
  try {
    const web3 = new Web3(config.web3.provider);
    const routerContract = new web3.eth.Contract(
      CONTRACTS.ROUTER_ABI,
      CONTRACTS.ROUTER_ADDRESS
    );

    routerContract.methods.getAmountOut(
      1 * 10 ** token.decimals,
      token.address,
      stablecoin.address
    );
  } catch (error) {
    return 0;
  }
  return amount / 10 ** stablecoin.decimals;
};

const findToken = async (address) => {
  const baseAssets = await redisHelper.getBaseAssets();
  return baseAssets.find((asset) => asset.address === address);
};

/*
 const web3 = new Web3(config.web3.provider);
      const multicall = new Multicall({
        multicallAddress: CONTRACTS.MULTICALL_ADDRESS,
        provider: web3,
      });

      const factoryContract = new web3.eth.Contract(
        CONTRACTS.FACTORY_ABI,
        CONTRACTS.FACTORY_ADDRESS
      );
      const gaugesContract = new web3.eth.Contract(
        CONTRACTS.GAUGES_ABI,
        CONTRACTS.GAUGES_ADDRESS
      );
      */
