const abis = require("../abis/abis");

// Deplyoed contracts
// const pool3Router = "0x1232F696982b305c3178F71BAD43934b47924505";
// const LPToken = "0x01a3f3C036710A1E3940D02cA342c4FfFA858635";
// const WETH = "0x454B8576Eb63e9b36E087FDe38eB7Ab077A44263";
// const Stratum = "0x6F3269E28F1cA9596F001776fb894F707c011a96";
// const GaugeFactory = "0x7a1d7065c8f5abCeBA718d513b47a1f835765D8B";
// const BribeFactory = "0x569fc290c9c0e0F7dD404CD635d34F391FE1F278";
//2pool
// const PairFactory = "0x373914808ef8de2E69343ca6C2B707d5eA6AAc69";
//3pool
// const PairFactory = "0x38994f4CB279aA33659B81df770b1321d7f5BA6C";
// const Router = "0x5B5297813a3BCaDD4fC8407DD69dAB4974247eFA";
// const Library = "0x4101998fF25dBEf94409c9c507F668Ae3F4687aF";
// const VeArtProxy = "0xC4E460431057DC7BFA49ecC65f4A332FC4574C94";
// const VotingEscrow = "0xB6BE0b806EEdae7bfDcD7C9f875a3158283694e0";
// const RewardsDistributor = "0xB766dEEdbfBE81cEDDD57765AD58Aabd0D8Fc088";
// const Voter = "0x62AC9e964A4A9a16dc2Adef1154afB04B00869e1";
// const WrappedExternalBribeFactory =
//   "0xD2C84e7aD50Dbc075d262DE35603E979868da25A";
// const Minter = "0xE8DCfBb9DAb949bcd5c8a3A6b7534147B33cF1e5";
// const StratumGovernor = "0x5454a0FAf896841103CDb5f54e9744A6Ba8BD075";
// const MerkleClaim = "0x197340000e95eaA556af77FFF5809ACbAC999559";
// const LUSD = "0xAf4522EcFa53915802eb0b0a4d5377db6Ba48a3F";
const Multicall = "0xFe9ADDbC2c6ECD0c748aFce576cB9C5dd184f269";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//2pool config
// const ADRS = {
//   Stratum: "0x6F3269E28F1cA9596F001776fb894F707c011a96",
//   GaugeFactory: "0x7a1d7065c8f5abCeBA718d513b47a1f835765D8B",
//   BribeFactory: "0x569fc290c9c0e0F7dD404CD635d34F391FE1F278",
//   PairFactory: "0x373914808ef8de2E69343ca6C2B707d5eA6AAc69",
//   Router: "0x5B5297813a3BCaDD4fC8407DD69dAB4974247eFA",
//   Library: "0x4101998fF25dBEf94409c9c507F668Ae3F4687aF",
//   VeArtProxy: "0xC4E460431057DC7BFA49ecC65f4A332FC4574C94",
//   VotingEscrow: "0xB6BE0b806EEdae7bfDcD7C9f875a3158283694e0",
//   RewardsDistributor: "0xB766dEEdbfBE81cEDDD57765AD58Aabd0D8Fc088",
//   Voter: "0x62AC9e964A4A9a16dc2Adef1154afB04B00869e1",
//   WrappedExternalBribeFactory: "0xD2C84e7aD50Dbc075d262DE35603E979868da25A",
//   Minter: "0xE8DCfBb9DAb949bcd5c8a3A6b7534147B33cF1e5",
//   StratumGovernor: "0x5454a0FAf896841103CDb5f54e9744A6Ba8BD075",
//   MerkleClaim: "0x197340000e95eaA556af77FFF5809ACbAC999559",
//   WETH: "0x454B8576Eb63e9b36E087FDe38eB7Ab077A44263",
//   Swap: "0x02635a0d10cc042EDd4CBFF158B9514Fb94C80E5",
// };

//3pool config
const ADRS = {
  Stratum: "0x3A5912EFBC426679D85BEA92bD2DAb7958b405D2",
  GaugeFactory: "0xE84672dea759b4bD5196Cacfd14f2f704431F4f2",
  BribeFactory: "0x24F1614b178eBd2060188E3D8D258C203a206a7A",
  PairFactory: "0xE825d0F0d70F4448bc53480756B98cce39f81185",
  Router: "0xeEB66641f81232c84Bef8007477A3aa229Dfb007",
  Library: "0x3438dc259Bf73e327b0818F1cfc8Bd1A7bFA896f",
  VeArtProxy: "0xbF20E6766712ce08384519517cba2d0A84e386C7",
  VotingEscrow: "0x93257Cf9fe6d59E37D799864bA08BFa5C74FF329",
  RewardsDistributor: "0x5B61F1B9601C5299f371C42154015FbB7509C381",
  Voter: "0x5838f013Dd9177950bf05E172Bc78Fe532ac9237",
  WrappedExternalBribeFactory: "0x8870B9f8875986bd8D60655b37Cbc3769368e1d3",
  Minter: "0x0c33d3E2746705e41618c3424ac3c1B3aD741e10",
  StratumGovernor: "0xD698996742412B1002249266B7fE28FB8C5Bebd6",
  MerkleClaim: "0xE7dd92Cc3262dBc6dcBc8cA1bac3103D56465B2a",
  WETH: "0x454B8576Eb63e9b36E087FDe38eB7Ab077A44263",
  Swap: "0x12A688b2a9f5EBFc9bFdE073ffAB1713cE37Ac28", // old: 0x02635a0d10cc042EDd4CBFF158B9514Fb94C80E5
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
