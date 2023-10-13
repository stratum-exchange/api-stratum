const abis = require("../abis/abis");

const Multicall = "0x167e4eb5E9f30a9b5bEA45bD6A78159b566c788C";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0xcb6b62136033118e381b5aC91f1bBB796EB6E369",
  Stratum: "0x50f2DBaE1FA147f79ea45cbD10eadF63097Ac30C",
  GaugeFactory: "0xE2Cd620c0edc5C579f88971aF25d5a49710E36dB",
  BribeFactory: "0x3Fb58FD638ed27c1B4dd4d307D2b657356391dE4",
  PairFactory: "0x87Dbd25628bC5B23e6d681Fea05D463041596473",
  Router: "0xF628ddB06119Ce0F0F7dD7902502F6BE201B9Cb7",
  Library: "0x7d49912DA6C8679571afFdA264841d8BecADe335",
  VeArtProxy: "0xEA301C1c10467453dc837e76F55f91aa387340Bc",
  VotingEscrow: "0xd4702f489a4817DF8226D884E5554E719C5B5355",
  RewardsDistributor: "0x066162c325Fe7A51D09731c5E77A4e77324369E3",
  Voter: "0x3015C94346C862cc111cDB8FDA63A0077A7CA0D9",
  WrappedExternalBribeFactory: "0xF0643ADDEE8fb09e3B8924E007Bb09bC364c20bF",
  MetaBribe: "0xd83BE8D1F2f7029F28d836179ee6aaEE7ec01417",
  Minter: "0xE78Fa8E31885906589CE8F37F09Dcf55CE806E57",
  StratumGovernor: "0x91c861eeA03fD1d8ca5FB9A97b94adcf74B7e4F6",
  MerkleClaim: "0xe35bFE3dcfD8ae12B91720f2FB4D5e9414419451",
  UST: "0x9f06b80176570EecbC954aBF4C32FBd0b0AE4C3e",
  LUSD: "0xa20F5bEF161Fbd42283832D219afa851e93a2419",
  DAI: "0x20DC21E4F125c105b97c00d989721577858a86c7",
  USDC: "0x1C40a5Fc5D5dB9bE2A874d53fB8FCD6B91b49C87",
  Swap: "0xB858Ff463eFB51B71af8f76AFe907b1E56b168e0",
  SwapToken: "0x96dcf8DE8d3Ad0b17dBab4B0B9bD0B2Cc30FE015",
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
