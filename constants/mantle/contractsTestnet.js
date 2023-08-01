const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WETH: "0xb7cBd9F267f16dCf6C4106D689F7DD1cedD048dE",
  Stratum: "0x967712650Ed358bC932788Eb11830C95309d496C",
  GaugeFactory: "0xaf9B958175500c7Ed849EDFE189b18C4BEc5aBBC",
  BribeFactory: "0x91392feB9e058982f2f0a440FeAd8b2447b47771",
  PairFactory: "0x4f009b8b6BFB6dA1fdAA0224f4082547F089Eb97",
  Router: "0x45DC0C26e5DC615A72d3Ea8Bc848d4Fa2c5CceBf",
  Library: "0x0c76954615Ed6AB54e5AA8eb9e97cF5E36CeCa27",
  VeArtProxy: "0x42F37F55e05C5A279a795E5A8460D6690aD70996",
  VotingEscrow: "0xAb68f4b5F0eb44aa1F9803bC06b5502B14B46C2b",
  RewardsDistributor: "0x4650E19e5Dad1e55BCc665dDcdB04Aa312eB8602",
  Voter: "0xFBff07aE5Cd465fE44EaBa01E512568959F7B45B",
  WrappedExternalBribeFactory: "0xd1CcFEeBfeC9973b3645C6EBF698E66e07b5D946",
  MetaBribe: "0xAEBf267d699c6Ed45f6d379dDa74A17c6D71c88b",
  Minter: "0x81d0041c84B27D502F3144551fC0D4fED38e1A32",
  StratumGovernor: "0xBe115fcE291a086f40275e788f6e747703F26830",
  MerkleClaim: "0x8f7795B9e31bC976ff51238813681A827E77a270",
  KEK: "0xaDdbDF0f14B37441E2DD8332D3C3579727f87bed",
  FUN: "0xc90fb0c202e57f3bBDDE17192Ba6C17f58ad7239",
  ZZZ: "0x2F87cA0EA6DCd4AC47b5Fe560D65269cfE3f61eE",
  Swap: "0x6C7B8bcb262e24Ca5334836bB7F72Fe5d8A207Eb",
  SwapToken: "0x972D323A13Aa08a7f189E6D3D254C510FbbB1303",
};
// ********************************

// module.exports.FACTORY_ADDRESS = "0x95D0f5bD9BCA1DB2b51Bd463b195c8494c4B640e";
module.exports.FACTORY_ADDRESS = ADRS.PairFactory;
module.exports.FACTORY_ABI = abis.factoryABI;

// module.exports.ROUTER_ADDRESS = "0x4842264a641289256434251D5804203a342BCAEA";
module.exports.ROUTER_ADDRESS = ADRS.Router;
module.exports.ROUTER_ABI = abis.routerABI;

module.exports.GAUGES_ADDRESS = ADRS.Voter;
module.exports.GAUGES_ABI = abis.gaugesABI;

module.exports.ERC20_ABI = abis.erc20ABI;
module.exports.PAIR_ABI = abis.pairABI;
module.exports.GAUGE_ABI = abis.gaugeABI;
module.exports.BRIBE_ABI = abis.bribeABI;
module.exports.TOKEN_ABI = abis.tokenABI;
module.exports.LP_TOKEN_ABI = abis.lpTokenABI;

// might change if we have multiple 3pools
module.exports.POOL3_ROUTER_ADDRESS = ADRS.Swap;
module.exports.POOL3_ROUTER_ABI = abis.pool3Router;

module.exports.WRAPPED_BRIBE_FACTORY_ADDRESS = ADRS.WrappedExternalBribeFactory;
module.exports.WRAPPED_BRIBE_ABI = abis.wrappedBribeABI;

// module.exports.MULTICALL_ADDRESS = "0x7D902aa0d30027A8Db3E13C8a8EC95cc3b3E2192";
module.exports.MULTICALL_ADDRESS = Multicall;

module.exports.STABLE_TOKEN_ADDRESS = StableToken;
