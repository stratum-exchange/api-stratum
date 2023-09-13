const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0xB6B3B18f0335F52702d2F44979997ee0a8c4BF8C",
  GaugeFactory: "0x852784DaeDf6a02AE59F7fab719AF9166343e123",
  BribeFactory: "0x8a0703bf0D7E743f3b72dB8D77BeA04fadA2a178",
  PairFactory: "0x046a1B41C8ef1179ce011eDfE063710627E1af51",
  Router: "0x7eB7a51db758FE40eD553C17BFB9E6FB0211250B",
  Library: "0xe087FCfA1Ec365F08850527b21e69c5906AFF314",
  VeArtProxy: "0xdA5fF52E165F60957Dc05ef5a800170dD7eda828",
  VotingEscrow: "0x3FF2867B97E07d9e6AaC5ED6e4107a5558d5A305",
  RewardsDistributor: "0x0976E7dE28b293CF14916f5b4b4B5D8fEEbA9f7F",
  Voter: "0x6bA7A80a8388Dc4c16915f7c9594a716fAD6e654",
  WrappedExternalBribeFactory: "0xe72B81f9D40eD8e2c16Bb90912B62facB2c8A84A",
  MetaBribe: "0x680f65c8282F13F774ca17A15bc29D2e1553917D",
  Minter: "0x9C40aA769F025864Ea58B658305c9425319395e4",
  StratumGovernor: "0x66C6E89A25b64f8c3CcAE9A9E1F664cc61A26507",
  MerkleClaim: "0x262749440053BC5bdbE9039EA86Ee36d8f89c282",
  UST: "0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29",
  LUSD: "0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD",
  DAI: "0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1",
  Swap: "0x3E19D214Ac80dEBA5934B0aD55c3423cE1f9A9C9",
  SwapToken: "0x09A3f56E804977c3b845Bea336E010685C815449",
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
