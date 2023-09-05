const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0x677C04Fd18422bAf397Af75Ec8BeEe6D86718DEE",
  GaugeFactory: "0x90AF7AF342E638bF205abb423aCaE36620B2b691",
  BribeFactory: "0xe56262e291e8F3492E127B47B72220FDcC75D58a",
  PairFactory: "0xF69F8B8843415A1ca1DF7A1b4346188E34435A5c",
  Router: "0x92C426A54A8C2d649b6670eE3e1cBBC28150Ba99",
  Library: "0x2060a251eAa6c380d593E2B63Ae5D55085a98971",
  VeArtProxy: "0x3A41bfa70262728AEaa9bD86c32FCfcfa3282F6A",
  VotingEscrow: "0xdd3ea60FbF7094f605382B90e46b848AacB67061",
  RewardsDistributor: "0x41D662858DE809c6BE8157dA6341A00465a852FE",
  Voter: "0x92BaB7540C7780A26989de7Dd0cfbc6a87Ec2e4A",
  WrappedExternalBribeFactory: "0xDa5636fDC7ea240cb936C44666791b91fed15cFd",
  MetaBribe: "0xa80D02847803863582EbD4d1Df3e9E30431e0aF9",
  Minter: "0x9d904FAA42F812b310504f811bD41947CA6d9c0d",
  StratumGovernor: "0x09C33A5Ba50DB9deE2733eA697cd9D53845Db460",
  MerkleClaim: "0x0D818457dE44BA293a066d7DAEC68E56E20bB474",
  UST: "0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29",
  LUSD: "0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD",
  DAI: "0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1",
  Swap: "0x389ecE029d636034EA5F45F0Dd3572a874b9aeCc",
  SwapToken: "0x3EF8AFB6262cD40BA55e185cf196076296f4dcf3",
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
