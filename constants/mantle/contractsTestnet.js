const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0x334CEE9c2A3d370C72de7856C565B9f4f9e25d63",
  GaugeFactory: "0xebFD3C6D4c87758a79DB58701a3Bf35eB4bCbB9D",
  BribeFactory: "0x1e2EBDB1Dcc35113f908Fd2c14e4253Dd07A7C79",
  PairFactory: "0x39096f29E6e654BD19d5C2c405bd5b1bd7cE7EbA",
  Router: "0x1541637a4b18B5Ac23F1A577eAe26704e73c5FEC",
  Library: "0xa959Dd2B3348f671A32dfa0ACf7F38d02FEf2BE8",
  VeArtProxy: "0x09bb8966844406F32Ea3a9ba87DeeF42af8721b9",
  VotingEscrow: "0xEDAA3618F8e53078b76ad690147d74D1d87B7fB1",
  RewardsDistributor: "0x8B53306EF07E6a87A532D97df3cE5257227d5773",
  Voter: "0x80e2Af5B93bee645f70Ef754c1a88Ae7D05A0054",
  WrappedExternalBribeFactory: "0x40Aa9cCb6C759011C00fFE71273640836803aD1d",
  MetaBribe: "0x3f89Dcf0eE41f5B0B96457C624501375D52Adfd6",
  Minter: "0x4237618B2C1dd9b00623522D9B71B661505c4cf1",
  StratumGovernor: "0x18aD859e8e95808d1D26aD8695c2FE31Babc1A2E",
  MerkleClaim: "0x20917261Fdb30FFc9f2B4B19D00497d00D140860",
  UST: "0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29",
  LUSD: "0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD",
  DAI: "0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1",
  Swap: "0xAFFC94A61217Ef8B346A79E70A92952EDCCC1962",
  SwapToken: "0x983b22448F3811e3d20934eEeb9b7C866E345240",
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
