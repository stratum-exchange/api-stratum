const abis = require("../abis/abis");

const Multicall = "0xcA11bde05977b3631167028862bE2a173976CA11";
const StableToken = "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
  Stratum: "0x1e1167872542Ce999F5885E9DBA09b6B4B281593",
  GaugeFactory: "0x6D3751a18aC3a72df466B71da7064C61E0443F98",
  BribeFactory: "0x6c0873dEfBF597D36702fdd757821632a7C12B40",
  PairFactory: "0xEFa67d5ff8b8B045731CF176af1758c932E84F5A",
  Router: "0xa9e1D8b30BD6d62DC764e4E6A8c72Cd9E4e21C16",
  VeArtProxy: "0x474086536E7E96049Dc9Eb47e22cCd395b50BE51",
  VotingEscrow: "0x45031F6323Ec334C2912c6998E7d6816099Bc93e",
  RewardsDistributor: "0xF12D260732ef6A44FC1b3cA237DFf990313e8f40",
  Voter: "0xc800a9FC46BC5F8103f0aBA9F3366a6556b4Fd83",
  WrappedExternalBribeFactory: "0x0fbC529cb696D7599053E44caC8964f6464c7b8f",
  MetaBribe: "0x6e177Cc1a93d1D6bA44FD3f1A1D21AbFC08156B1",
  Minter: "0x10495C3a628Fe2d57B0b026A059B75D8Dfe433Ba",
  MerkleClaim: "0x24c37834C3cE14D71aC605b731FFEF1575dA998E",
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
