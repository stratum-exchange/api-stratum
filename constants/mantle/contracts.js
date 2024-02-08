const abis = require("../abis/abis");

const Multicall = "0xcA11bde05977b3631167028862bE2a173976CA11";
const StableToken = "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
  Stratum: "0x5a093a9c4f440c6b105F0AF7f7C4f1fBE45567f9",
  GaugeFactory: "0xcFcfbBB92094c08Ed8E7cB283fBb9468182E6d7C",
  BribeFactory: "0xE133E55E018B9260Bdc82927761E111db8dad6BB",
  PairFactory: "0x061FFE84B0F9E1669A6bf24548E5390DBf1e03b2",
  Router: "0xE856d35f554A6656d70cCf1B11D4Ae7cEE24F473",
  VeArtProxy: "0x64cb655AbE380caBb30b8847F493C9c99e4bfC4d",
  VotingEscrow: "0x28A8e21CFE4586002B4829EBdd7f6F3d88Ed79c1",
  RewardsDistributor: "0x505AEE50d6cEf38C97BC3C8C7C76a68D5d69c0cB",
  Voter: "0xd14884b51Ff6cDa4F6f92f0fe7ac198C6c63BC7a",
  WrappedExternalBribeFactory: "0x1DdDB6bA33e0d0a16E3B56Df9289F9b23Aeb40B7",
  MetaBribe: "0x4DE700f5B01954eb154d47721743B0bB37AdF74D",
  Minter: "0xD4096B163731E6e4178Eb24f4952bE246536d654",
  MerkleClaim: "0xc2cb4EC0f38214F1b4805E72D3fa4df8c30fe616",
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
