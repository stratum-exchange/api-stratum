const abis = require("../abis/abis");

// Deplyoed contracts
const WETH = "0x454B8576Eb63e9b36E087FDe38eB7Ab077A44263";
const Stratum = "0x6F3269E28F1cA9596F001776fb894F707c011a96";
const GaugeFactory = "0x7a1d7065c8f5abCeBA718d513b47a1f835765D8B";
const BribeFactory = "0x569fc290c9c0e0F7dD404CD635d34F391FE1F278";
const PairFactory = "0x373914808ef8de2E69343ca6C2B707d5eA6AAc69";
const Router = "0x5B5297813a3BCaDD4fC8407DD69dAB4974247eFA";
const Library = "0x4101998fF25dBEf94409c9c507F668Ae3F4687aF";
const VeArtProxy = "0xC4E460431057DC7BFA49ecC65f4A332FC4574C94";
const VotingEscrow = "0xB6BE0b806EEdae7bfDcD7C9f875a3158283694e0";
const RewardsDistributor = "0xB766dEEdbfBE81cEDDD57765AD58Aabd0D8Fc088";
const Voter = "0x62AC9e964A4A9a16dc2Adef1154afB04B00869e1";
const WrappedExternalBribeFactory =
  "0xD2C84e7aD50Dbc075d262DE35603E979868da25A";
const Minter = "0xE8DCfBb9DAb949bcd5c8a3A6b7534147B33cF1e5";
const StratumGovernor = "0x5454a0FAf896841103CDb5f54e9744A6Ba8BD075";
const MerkleClaim = "0x197340000e95eaA556af77FFF5809ACbAC999559";
const LUSD = "0xAf4522EcFa53915802eb0b0a4d5377db6Ba48a3F";
const Multicall = "0xFe9ADDbC2c6ECD0c748aFce576cB9C5dd184f269";
const StableToken = "0x0faF6df7054946141266420b43783387A78d82A9";

// ********************************

// module.exports.FACTORY_ADDRESS = "0x95D0f5bD9BCA1DB2b51Bd463b195c8494c4B640e";
module.exports.FACTORY_ADDRESS = PairFactory;
module.exports.FACTORY_ABI = abis.factoryABI;

// module.exports.ROUTER_ADDRESS = "0x4842264a641289256434251D5804203a342BCAEA";
module.exports.ROUTER_ADDRESS = Router;
module.exports.ROUTER_ABI = abis.routerABI;

module.exports.GAUGES_ADDRESS = Voter;
module.exports.GAUGES_ABI = abis.gaugesABI;

module.exports.ERC20_ABI = abis.erc20ABI;
module.exports.PAIR_ABI = abis.pairABI;
module.exports.GAUGE_ABI = abis.gaugeABI;
module.exports.BRIBE_ABI = abis.bribeABI;
module.exports.TOKEN_ABI = abis.tokenABI;

module.exports.WRAPPED_BRIBE_FACTORY_ADDRESS = WrappedExternalBribeFactory;
module.exports.WRAPPED_BRIBE_ABI = abis.wrappedBribeABI;

module.exports.MULTICALL_ADDRESS = "0x7D902aa0d30027A8Db3E13C8a8EC95cc3b3E2192";
module.exports.MULTICALL_ADDRESS = Multicall;

module.exports.STABLE_TOKEN_ADDRESS = StableToken;
