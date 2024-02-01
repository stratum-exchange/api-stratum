const abis = require("../abis/abis");

const Multicall = "0xcA11bde05977b3631167028862bE2a173976CA11";
const StableToken = "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
  Stratum: "0x5226C16522C00092418d7C9B83d3283889C19FD9",
  GaugeFactory: "0x28566Eb9A021eCe95838743c6D47351795799033",
  BribeFactory: "0xBf9E20c665C7Ae3044Fcc639c729F3BF2E84407b",
  PairFactory: "0x851Bd5807C2A31E14cBcf77a613C13F95380Ad64",
  Router: "0x0bbd60c1892A26e8a1ebD85E43958490A7122E9C",
  VeArtProxy: "0xbf17B3316CD018A5124c0A688F9A9cBccf8125B6",
  VotingEscrow: "0x2ca967843def363928031609c1d8257c456AEa11",
  RewardsDistributor: "0x6FbfaE7FaB0581f77BE48c2369a11A6aFc11e558",
  Voter: "0xcFDD7ba10AC04487Cc5eE20594189DFF0E1dcE53",
  WrappedExternalBribeFactory: "0x13f388cB91489c00a4fd78C956a2A2f1f96c6eeC",
  MetaBribe: "0x8802328836E2C42Bcb304B4bd7cB7A1c133AD14d",
  Minter: "0xbC9AA6cb26cE03E64E585311d3D39f66ac6D9E4D",
  MerkleClaim: "0x2A4E2A793Ae89571F59Fcd37f2B85565E2394A55",
  USDC: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
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

module.exports.STABLE_TOKEN_ADDRESS = ADRS.USDC;
