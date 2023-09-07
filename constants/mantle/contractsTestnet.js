const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0xd4F3A8da4800cadFcE7EaF690b7F36FDcEC14be0",
  GaugeFactory: "0xB4Ae2FDeE0CbF16adB54F745A4b15F4e2349E7A9",
  BribeFactory: "0xC9eBF4A8dc313730ad4F35491A6e383f291f61cA",
  PairFactory: "0x93C16d206CEf568Dad25EA89bba5603aAFF14858",
  Router: "0x78Bc9e1a9dA902c9e4b2F930Db5300205Cd7ac1E",
  Library: "0xC050671dab2D7a474A44C3B26f63b251434FBc5a",
  VeArtProxy: "0xb66bea5b431B749daF426A1014E97185b3D8b1CA",
  VotingEscrow: "0xa9bE4efD1dde0eF8C8b1EBAB99B4e0467eed4C59",
  RewardsDistributor: "0xbFdE03ad5Bb608D5Dbab8b948C8322cE16c8597f",
  Voter: "0xD74604CdFAbf8E23b4dc553e0E910CD6D414Bc49",
  WrappedExternalBribeFactory: "0x2a4F62B48187864f0b759ae939F4Ee354C5b71F7",
  MetaBribe: "0x1917489A954DfAf230Fb78343a1F8Cd157721BD7",
  Minter: "0xD6A82b92C32886C927efE72B475Af144D1057f2D",
  StratumGovernor: "0xC41CaE196b980df90F4C47631589f4c69C60EF0c",
  MerkleClaim: "0xF30f1Cd1eBf21d7C5f158d561fCF7A855f2ac290",
  UST: "0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29",
  LUSD: "0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD",
  DAI: "0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1",
  Swap: "0x43030f0E86BdcE25136c2f0Bf1914a8480D588b8",
  SwapToken: "0x3C0fe2aCa9C17B464B5516DD133c3Bb0185Dfc1A",
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
