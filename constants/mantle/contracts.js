const abis = require("../abis/abis");

const Multicall = "0xcA11bde05977b3631167028862bE2a173976CA11";
const StableToken = "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9";

/****************************************
 * Only switch between 2pool and 3pool  *
 ****************************************/

//3pool config
const ADRS = {
  WMNT: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
  Stratum: "0x46c86eD0f2d2Eefa403dB2a625171D8546D6617d",
  GaugeFactory: "0x6A4252d91fdd6D4062d43C775ADD3c253f8AB1e3",
  BribeFactory: "0x6A3425fFe9dF87aFDcbf283b91Cb5c89abD0E4b9",
  PairFactory: "0x06d468FB9dE5107504eD6418f6A7F858f04B3328",
  Router: "0xD5F000EA51A2ccdC6ECEF7eEfCEa5a52beB4DB9F",
  VeArtProxy: "0x65DBb3b8C74AC21dD182fde10f2b7d03eae2E7b0",
  VotingEscrow: "0x7b0c0EFD3E403403a9E6BC13F0a0001F5cdE0cBE",
  RewardsDistributor: "0xA6274656bBe6FD4a122555a7b808fE45fe8deC43",
  Voter: "0x1CD93A0716A5814AcA7aA4fe802871e52334c2b1",
  WrappedExternalBribeFactory: "0xBFA449bB9F562ff7FF6B2301c76193E3161cfb92",
  MetaBribe: "0x05688eCd0e5D76c6acA16B93Bcdf18Bf77A42e7f",
  Minter: "0x1cb1EF5008415F84C5C953285Bb5DB4979f00e2B",
  MerkleClaim: "0x66A1a2e783846B06cbC64E48c7e64107c06352cc",
  USDC: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
};
// {
//   WMNT: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
//   Stratum: "0x1eDe4AE9421829f0ADa9a136aA17Da79E53818cF",
//   GaugeFactory: "0x1dcA89Df77c44e681871327A7e3d7BA9C9E2f431",
//   BribeFactory: "0x26c4C14458Aa95d1b33710A1a9d57DFAC46C16fe",
//   PairFactory: "0x7f42c77085D06E6231709Ba9eb1Cd100E71c3cdc",
//   Router: "0xEd659C34f9F65AE7E1EF5b781cD8b51fF0883bB5",
//   VeArtProxy: "0x7883CcD63835e32BBa469A416aFEB93FDf66B512",
//   VotingEscrow: "0xFB8CD04072aa0F3812917CD28045F6101438C1A1",
//   RewardsDistributor: "0x6A295c24Fa648197Cc8766e0cf24CEC7BC1Bd61e",
//   Voter: "0xeE30D063e33c44D328f891CA894DE9573B92beC2",
//   WrappedExternalBribeFactory: "0x951B4aB08Fa289B6b53Fc490d5d9D1807103E820",
//   MetaBribe: "0x576299CDcb12E0488Ffd6ca6D121423112399C66",
//   Minter: "0xD49981c69484B23bB55a88787aa5b7957Cf0Cd50",
//   MerkleClaim: "0x66f2492aa2DB2Bd29eFf1B1774de102af9D38926",
//   UST: "",
//   LUSD: "",
//   DAI: "",
//   USDC: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
//   Swap: "",
//   SwapToken: "",
// };
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
