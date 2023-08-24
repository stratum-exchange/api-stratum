const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0x637483E2c7AAE09e76EFBEa9F551cF4ee67db38B",
  GaugeFactory: "0xB2D2624056d08C30646AAD01589Ab81E37b0C549",
  BribeFactory: "0xA7A26654A60a0f72595a3bB4F5B1FFB02909bbE4",
  PairFactory: "0xe2ef6b18438ad8745e9aAfD113a4ABD206557638",
  Router: "0xcf7fEb4e1612Cc6e7cf169a15a58b9e5F3b39DF3",
  Library: "0x41a886f8af3FD6fce0586686128E41bE58Cc05a9",
  VeArtProxy: "0x35c35971457E511becb595Da0c5de6d497F3bb87",
  VotingEscrow: "0x1a773D1A23409E6E8B1A3B55c470f2b795691379",
  RewardsDistributor: "0xCf83d6F242E44EfED05289F9a15C3dB790D29514",
  Voter: "0xbA1Df041A40f38De88c79A24b252C298cF245942",
  WrappedExternalBribeFactory: "0xE833b948f73169Bc609E97aD6Fe3733c0E4Bb409",
  MetaBribe: "0x26CC5d270Ee32768bE83a9B31e3636f90680035b",
  Minter: "0xBb054d45B8B92546d876c766D6A1C8aAf4743A0F",
  StratumGovernor: "0x4d0C8B7a36b6Df53F7bddDb7b9D705a5B1B918Ab",
  MerkleClaim: "0x5e8D01F59b8f8880a2A11D2fe0242C05F02Ba09a",
  UST: "0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29",
  LUSD: "0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD",
  DAI: "0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1",
  Swap: "0x8ed01680eF239488799153dC2Fe022c89F5b1512",
  SwapToken: "0xC552E4408AbB4783760a371DedCcA26c30D98415",
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
