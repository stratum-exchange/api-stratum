const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: '0xcb6b62136033118e381b5aC91f1bBB796EB6E369',
  Stratum: '0xfe0a99cC301497D066dd906855a0Cc6A397f702f',
  GaugeFactory: '0x81E82733778ee9c1916Bf4eFF73757754f2Ff72b',
  BribeFactory: '0x4376885d8556CcF3B2B4e2D3319eB457c7A56044',
  PairFactory: '0x9cCB11fAAce100bbbB7C898F702381d6b1CA09a7',
  Router: '0x02858fB6e079f014786cAe6614A6D6E8eC5212AF',
  Library: '0xDD43D9B2441ef88419a8A585c448BA06A8b6Fe34',
  VeArtProxy: '0x13423f33543fae2d566E3147162BA102B020686A',
  VotingEscrow: '0xe4B1F2270B4993844CAf8D69025dCC1905939661',
  RewardsDistributor: '0x86812c30BFe8920C2a47e2e0Cd5A19057a7C51C5',
  Voter: '0x2af19546815B94219a96a1f05e4051202565de98',
  WrappedExternalBribeFactory: '0x6DE50d533529877942f004C64Cde66D286DF4095',
  MetaBribe: '0xB8393fE1802d43F70E87fB5CBBB575A7FDe2A4f2',
  Minter: '0x01bF5b3570Fbf840d18Eaf0e4B0ea57200E7c6A5',
  StratumGovernor: '0xC1B392109E60c7522E8C0B06aB25cB54B00d19c9',
  MerkleClaim: '0x998279514fAF061D83A2Aa07026940B314EDeb55',
  UST: '0x9B166fE65850c8BAF622512ce8A1B20E9a6B0F29',
  LUSD: '0x17B71a0389F9Cbf09f8707DAeA876BaE4B9831bD',
  DAI: '0x3E2f36f7A57A4C713BA6616eDb251DfB421E19D1',
  Swap: '0x71C021245a505aF41D7e01bdc726dB584E7C8963',
  SwapToken: '0x563A9E847dC11CdC09913DC5c41ca9Cf31747e8a'
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
