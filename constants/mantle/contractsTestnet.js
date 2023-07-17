const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WETH: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
  Stratum: "0x6cbf76aA6D44bA23880a9Af5258647C827541411",
  GaugeFactory: "0x24F38e930de2c02a4761215a6c3bc073d5c6d8B7",
  BribeFactory: "0x10Ec211406D5B7CF58b70a3D421412157889B28A",
  PairFactory: "0x334233EC716f0245bB3c5e2Be72FD3ea23e67996",
  Router: "0x7e4939D4Ce43004aB8614d298C0a38f58dB31AB0",
  Library: "0x1Fa5dD2186DEe80eBB2406A5cDCB6AFB6a1B55Cc",
  VeArtProxy: "0xF86cdd330d289f443525c0E0F21Ba9927AEc6247",
  VotingEscrow: "0x6fef45F1104C84a5Cd43Af69e26DAC923d4B049E",
  RewardsDistributor: "0x32c15621666B4e410581F46d651D424ebE65BF4B",
  Voter: "0xF550D09a62695785A2ffBE2a13Fa5e0e824c7b53",
  WrappedExternalBribeFactory: "0x86F8e15569F3EaFac159CD400b87757DBB9415Ac",
  MetaBribe: "0x2411a15Bf4018ce6364C245538A7Ff658Fa219a0",
  Minter: "0xD1CF6AE3fFbC21412272F196BfcAd80a88A3D78D",
  StratumGovernor: "0xe981E0A966Eb0EE3530E6c0583D7FE5F52ea5a28",
  MerkleClaim: "0xD5fb94D9C08932965a711FAa4f5D5aD65E6af7fE",
  KEK: "0xaDdbDF0f14B37441E2DD8332D3C3579727f87bed",
  FUN: "0xc90fb0c202e57f3bBDDE17192Ba6C17f58ad7239",
  ZZZ: "0x2F87cA0EA6DCd4AC47b5Fe560D65269cfE3f61eE",
  Swap: "0x7E25FB39f15B2c955bbc9a8DFbA43d9FD97f7437",
  SwapToken: "0xbA3BBb25Ee2C84B58f40fdBFa7984eb10e7C4C11",
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
