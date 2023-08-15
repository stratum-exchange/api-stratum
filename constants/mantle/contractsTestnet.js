const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0x9a220B3Dd45a17dAEE7c6F7e6e1c8E55f31b17de",
  GaugeFactory: "0x03Ac00bff6d1A59B1161DFE9baf97cCbf4D8D0C2",
  BribeFactory: "0x8f82155c9aBDBAB088Bc2e4088894c748dc84551",
  PairFactory: "0xa9cd5D79B283df6607Ea2C0365FbFaA7caca0e28",
  Router: "0x303A5bdb1175F1222e1eFcB4ee2e2b7881B62A19",
  Library: "0x7EC14FBbB38891B3e3465eD809858B8269D5c01f",
  VeArtProxy: "0xCb47570608D1024D08561019A35DA854761e3806",
  VotingEscrow: "0x1a43462B755a95c521D81526d5A79BA3df36A2D7",
  RewardsDistributor: "0xB00cdDe78C9ADE56a9362FA2bF6D2a7d875CDEc7",
  Voter: "0x1dEE50Da4B5bB5bE5C041E870ab724B4A9cF6Fc2",
  WrappedExternalBribeFactory: "0x7483c531D411aDdABCF9AF8a4fC488B46380A170",
  MetaBribe: "0x0f1A8fAA78c51708147F5410fD9DB55615586ce1",
  Minter: "0x4928f8B2B8e6F786eCe983551d148F249597368C",
  StratumGovernor: "0x9ECd8992B2de8E6EE6BcD17b76f136A9AfaaF73c",
  MerkleClaim: "0xBF7d66698240DDBa721308EE23234b392aba7149",
  UST: "0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29",
  LUSD: "0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD",
  DAI: "0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1",
  Swap: "0x6fC3F64950f5915c645fe2cD9c16c68c2BB40d75",
  SwapToken: "0xE379Cf7856a0414e84207215B46d8EC0981F957b",
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
