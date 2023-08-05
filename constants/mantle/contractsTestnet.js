const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WETH: "0x13a668e34A0c8D81C6502c3d999D83f6c7C026c8",
  Stratum: "0x8383bfd2744aFa47B43b65FAC5A67589b02d1368",
  GaugeFactory: "0x79443A73CdCfDdbdBA52140231A19Dd956628228",
  BribeFactory: "0xe45BE3BBF19f3264ce7D12c7D357EcF9540c93Bf",
  PairFactory: "0x5C911Ffb0021f38D2c4Cdb9315149C8dC70B1c52",
  Router: "0xD8860a6E10A1e5d2aF6F768ac52a0C97472D09c5",
  Library: "0xFa562242E1C453612CFC6F715Ce467b889857d71",
  VeArtProxy: "0xAbcDF55996B3aDACB171f13Be969a8f7D02925c1",
  VotingEscrow: "0xD21e3b3864454Bff4303af4bC6a20E184612675d",
  RewardsDistributor: "0x5BBfe1dEeB429D822087f1ffa22cB5356db82073",
  Voter: "0x4Cb364F1bF510fa67D28BCB152De212dA7BDC390",
  WrappedExternalBribeFactory: "0x6E70Ae67F33FcfF0502cB79D0C45ef25036eAb85",
  MetaBribe: "0x077705Cd2a80f47e5686962A952A97439626ce6C",
  Minter: "0x017349C848a376243404d70FA3D7133E588006f4",
  StratumGovernor: "0xA21f5C3F3Ea8DbAd100b9E99bce7Cb4b3f1C0C1B",
  MerkleClaim: "0xA03Ff0A6D9929c6Cf3a5748b8989732C07312193",
  Swap: "0x925ed7Cad79cb610DeEbBFF1b2761c988CcBc4c6",
  SwapToken: "0xe1b15e295Cd332e5012F37411A6e8bEb0a157859",
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
