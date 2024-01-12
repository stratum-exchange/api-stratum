const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
  Stratum: "0x1eDe4AE9421829f0ADa9a136aA17Da79E53818cF",
  GaugeFactory: "0x1dcA89Df77c44e681871327A7e3d7BA9C9E2f431",
  BribeFactory: "0x26c4C14458Aa95d1b33710A1a9d57DFAC46C16fe",
  PairFactory: "0x7f42c77085D06E6231709Ba9eb1Cd100E71c3cdc",
  Router: "0xEd659C34f9F65AE7E1EF5b781cD8b51fF0883bB5",
  VeArtProxy: "0x7883CcD63835e32BBa469A416aFEB93FDf66B512",
  VotingEscrow: "0xFB8CD04072aa0F3812917CD28045F6101438C1A1",
  RewardsDistributor: "0x6A295c24Fa648197Cc8766e0cf24CEC7BC1Bd61e",
  Voter: "0xeE30D063e33c44D328f891CA894DE9573B92beC2",
  WrappedExternalBribeFactory: "0x951B4aB08Fa289B6b53Fc490d5d9D1807103E820",
  MetaBribe: "0x576299CDcb12E0488Ffd6ca6D121423112399C66",
  Minter: "0xD49981c69484B23bB55a88787aa5b7957Cf0Cd50",
  MerkleClaim: "0x66f2492aa2DB2Bd29eFf1B1774de102af9D38926",
  UST: "",
  LUSD: "",
  DAI: "",
  USDC: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
  Swap: "",
  SwapToken: "",
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
