const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WETH: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
  Stratum: "0x7D0091DcC9e1675f69616d4cCb19f8dB9A786c4c",
  GaugeFactory: "0xBd85bB67BB00bA1c57714b1B2e0738AB39534635",
  BribeFactory: "0xA12eFb8731C98Cf30e0B2f6900f2AAb0BfE59320",
  PairFactory: "0x28897c4623acC0825FA72C108067C053d8d13900",
  Router: "0xA995Fddff081a9118C981733bc2112A7C3fd4256",
  Library: "0x09f7D753909d980b2b101A11bFF19a70A7E4069d",
  VeArtProxy: "0xB60B97bDc225326cc73B30D18aeA22F2CBC33F68",
  VotingEscrow: "0xC27CC6Be9a878e459747f06B17884EBE7c9A3845",
  RewardsDistributor: "0x2ffD63C5c17FfF487a644fDFac2705dF601cC3d3",
  Voter: "0x36c4F1338d5B7b310EEf67B0E7BDb5045bA8199A",
  WrappedExternalBribeFactory: "0x9B887ECBF9453BDC01599Ff1057649c8e9b6B04C",
  MetaBribe: "0x80D41D63eE8A814bc71cC76dF50F52f2125a5895",
  Minter: "0x3946e30a6997842eA973Dba8915F7FF139ABDf0F",
  StratumGovernor: "0x837DA26c198976ef680141f378d4EB0B110254a0",
  MerkleClaim: "0x13f0765b3b63eCAF3C54F3735A27DCd8362A1dA6",
  KEK: "0xaDdbDF0f14B37441E2DD8332D3C3579727f87bed",
  FUN: "0xc90fb0c202e57f3bBDDE17192Ba6C17f58ad7239",
  ZZZ: "0x2F87cA0EA6DCd4AC47b5Fe560D65269cfE3f61eE",
  Swap: "0x9D68B5dd8150A085fe451A442b31Ff2DE44c4702",
  SwapToken: "0xb27EF712bC914756464e75c44823d7B587019EF7",
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
