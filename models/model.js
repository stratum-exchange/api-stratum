const request = require("request-promise");
const CoinGecko = require("coingecko-api");
const Web3 = require("web3");
const config = require("../config");
const redisHelper = require("../helpers/redis");
const BigNumber = require("bignumber.js");
const fs = require("fs");
const Multicall = require("@dopex-io/web3-multicall");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const CoinGeckoClient = new CoinGecko();

let CONTRACTS = null;
let tokenlistpath = null;
if (config.testnet === "1") {
  CONTRACTS = require(`../constants/${config.chain.toLowerCase()}/contractsTestnet.js`);
  tokenlistpath = `constants/${config.chain.toLowerCase()}/testnet-token-list.json`;
} else {
  CONTRACTS = require(`../constants/${config.chain.toLowerCase()}/contracts.js`);
  tokenlistpath = `../constants/${config.chain.toLowerCase()}/token-list.json`;
}

const model = {
  async mergeTokenLists(req, res, next) {
    try {
      let rawdata = fs.readFileSync(tokenlistpath);
      let tokenList = JSON.parse(rawdata);

      // get mtr tokens from tokenlists
      const tokenLists = config.tokenLists;

      const promises = tokenLists.map((url) => request(url));
      const listsOfTokens = await Promise.all(promises);

      let tokensLists = listsOfTokens
        .map((tl) => {
          try {
            const json = JSON.parse(tl);
            return json.tokens;
          } catch (ex) {
            console.log(ex);
            return [];
          }
        })
        .flat();

      tokensLists = [...tokenList, ...tokensLists];

      const removedDuplpicates = tokensLists
        .filter((t) => {
          return t.chainId === config.chainId && t.decimals !== "";
        })
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.address === value.address)
        );

      // const RedisClient = await redisHelper.connect()
      // const done = await RedisClient.set('baseAssets', JSON.stringify(removedDuplicates));

      res.status(205);
      res.body = { status: 200, success: true, data: removedDuplpicates };
      return next(null, req, res, next);
    } catch (ex) {
      console.error(ex);
      res.status(500);
      res.body = { status: 500, success: false, data: ex };
      return next(null, req, res, next);
    }
  },

  async updateAssets(req, res, next) {
    try {
      if (config.testnet === "1") {
        let rawdata = fs.readFileSync(tokenlistpath);
        let tokenList = JSON.parse(rawdata);
        console.log(tokenList);
        const RC = await redisHelper.connect();
        const d = await RC.set("baseAssets", JSON.stringify(tokenList));

        res.status(205);
        res.body = { status: 200, success: true, data: tokenList };
        return next(null, req, res, next);
      } else {
        let rawdata = fs.readFileSync("token-list.json");
        let tokenList = JSON.parse(rawdata);

        const RC = await redisHelper.connect();

        const reply = await RC.get("pairs");
        const pairs = JSON.parse(reply);
        const tokenListWithBalances = await model._getAssetPrices(
          tokenList,
          pairs
        );

        const d = await RC.set("baseAssets", JSON.stringify(tokenList));

        res.status(205);
        res.body = { status: 200, success: true, data: tokenList };
        return next(null, req, res, next);
      }
    } catch (ex) {
      // console.log("here3");
      console.error(ex);
      res.status(500);
      res.body = { status: 500, success: false, data: ex };
      return next(null, req, res, next);
    }
  },

  async _getAssetPrices(tokenList, pairs) {
    try {
      //const key = 'ckey_cd6b18d02ce9483c933da3e57fe'
      //const url = `https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&tickers=USDC,MTR&key=${key}`
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=meter-stable,meter,usd-coin,dai&vs_currencies=USD`;
      const prices = await request(url);
      // console.log("prices:", prices);
      const dd = JSON.parse(prices);
      //const priceList = dd.data.items
      const quoteList = Object.values(dd);
      const coinList = Object.keys(dd);
      const priceList = [];
      coinList.map((c, i) => {
        let quote = {};
        quote.symbol = c;
        quote.quote_rate = quoteList[i].usd;
        priceList.push(quote);
      });

      const usdcPrice = priceList
        .filter((asset) => {
          return asset.symbol === "usd-coin";
        })
        .reduce((asset) => {
          return asset.quote_rate;
        });

      const daiPrice = priceList
        .filter((asset) => {
          return asset.symbol === "tether";
        })
        .reduce((asset) => {
          return asset.quote_rate;
        });

      const mtrPrice = priceList
        .filter((asset) => {
          return asset.symbol === "meter-stable";
        })
        .reduce((asset) => {
          return asset.quote_rate;
        });

      const mtrgPrice = priceList
        .filter((asset) => {
          return asset.symbol === "meter";
        })
        .reduce((asset) => {
          return asset.quote_rate;
        });

      const tokenListWithPrices = tokenList.map((token) => {
        //for mtr and usdc we just return the price we got from covalent
        if (token.address.toLowerCase() === config.wmtr.address.toLowerCase()) {
          token.priceUSD = mtrPrice.quote_rate;
          return token;
        }
        if (token.address.toLowerCase() === config.mtrg.address.toLowerCase()) {
          token.priceUSD = mtrgPrice.quote_rate;
          return token;
        }
        if (token.address.toLowerCase() === config.usdc.address.toLowerCase()) {
          token.priceUSD = usdcPrice.quote_rate;
          return token;
        }
        if (token.address.toLowerCase() === config.dai.address.toLowerCase()) {
          token.priceUSD = daiPrice.quote_rate;
          return token;
        }

        // get a pair with our base asset (ideally MTR, otherwise we use one of the USD pegs)
        const tokenPairs = model._getPairsFor(token, pairs);

        // if neither, we set $ value to 0 cause fuck that asset.
        if (tokenPairs.length === 0) {
          token.priceUSD = 0;
          return token;
        }

        // once we have the stable and volatile pairs for each, we check which has most liquidity
        const maxLiquidityPair = tokenPairs.reduce(function (prev, current) {
          let previousVal = 0;
          let currentVal = 0;

          if (
            prev.token0.address.toLowerCase() === token.address.toLowerCase()
          ) {
            previousVal = BigNumber(prev.reserve0).toNumber();
          }
          if (
            prev.token1.address.toLowerCase() === token.address.toLowerCase()
          ) {
            previousVal = BigNumber(prev.reserve1).toNumber();
          }

          if (
            current.token0.address.toLowerCase() === token.address.toLowerCase()
          ) {
            currentVal = BigNumber(current.reserve0).toNumber();
          }
          if (
            current.token1.address.toLowerCase() === token.address.toLowerCase()
          ) {
            currentVal = BigNumber(current.reserve1).toNumber();
          }

          return BigNumber(previousVal).gt(currentVal) ? prev : current;
        });

        let price = 0;
        let pairedAssetPrice = 0;

        // for most liquidity, we do reserve0*price/reserve1 where reserve1 is our base asset
        if (
          maxLiquidityPair.token0.address.toLowerCase() ===
          token.address.toLowerCase()
        ) {
          if (
            maxLiquidityPair.token1.address.toLowerCase() ===
            config.wmtr.address.toLowerCase()
          ) {
            pairedAssetPrice = mtrPrice.quote_rate;
          }
          if (
            maxLiquidityPair.token1.address.toLowerCase() ===
            config.usdc.address.toLowerCase()
          ) {
            pairedAssetPrice = usdcPrice.quote_rate;
          }
          price = BigNumber(
            BigNumber(maxLiquidityPair.reserve1).div(
              10 ** maxLiquidityPair.token1.decimals
            )
          )
            .times(pairedAssetPrice)
            .div(
              BigNumber(maxLiquidityPair.reserve0).div(
                10 ** maxLiquidityPair.token0.decimals
              )
            )
            .toNumber();
        } else if (
          maxLiquidityPair.token1.address.toLowerCase() ===
          token.address.toLowerCase()
        ) {
          if (
            maxLiquidityPair.token0.address.toLowerCase() ===
            config.wmtr.address.toLowerCase()
          ) {
            pairedAssetPrice = mtrPrice.quote_rate;
          }
          if (
            maxLiquidityPair.token0.address.toLowerCase() ===
            config.usdc.address.toLowerCase()
          ) {
            pairedAssetPrice = usdcPrice.quote_rate;
          }
          price = BigNumber(
            BigNumber(maxLiquidityPair.reserve0).div(
              10 ** maxLiquidityPair.token0.decimals
            )
          )
            .times(pairedAssetPrice)
            .div(
              BigNumber(maxLiquidityPair.reserve1).div(
                10 ** maxLiquidityPair.token1.decimals
              )
            )
            .toNumber();
        }

        // set price on token
        token.priceUSD = price;
        return token;

        // -- once we have USD prices for our assets, we go to pairs and start populating them with the data
      });

      return tokenListWithPrices;
    } catch (ex) {
      console.log(ex);
      return tokenList;
    }
  },

  _getPairsFor(token, pairs) {
    try {
      const relevantPairs = pairs.filter((pair) => {
        return (
          (pair.token0.address.toLowerCase() == token.address.toLowerCase() ||
            pair.token1.address.toLowerCase() == token.address.toLowerCase()) &&
          (pair.token0.address.toLowerCase() ==
            config.wmtr.address.toLowerCase() ||
            pair.token1.address.toLowerCase() ==
              config.wmtr.address.toLowerCase() ||
            pair.token0.address.toLowerCase() ==
              config.usdc.address.toLowerCase() ||
            pair.token1.address.toLowerCase() ==
              config.usdc.address.toLowerCase())
        );
      });

      return relevantPairs;
    } catch (ex) {
      console.log(ex);
      return [];
    }
  },

  async getBaseAssets(req, res, next) {
    try {
      const RedisClient = await redisHelper.connect();

      const reply = await RedisClient.get("baseAssets");
      const baseAssets = JSON.parse(reply);

      res.status(205);
      res.body = { status: 200, success: true, data: baseAssets };
      return next(null, req, res, next);
    } catch (ex) {
      console.error(ex);
      res.status(500);
      res.body = { status: 500, success: false, data: ex };
      return next(null, req, res, next);
    }
  },

  getRouteAssets(req, res, next) {
    try {
      // const routeAssets = [
      //   config.wmtr,
      //   config.dai,
      //   config.usdc,
      //   config.stratum,
      // ];
      const routeAssets = config.routeAssets;
      res.status(205);
      res.body = { status: 200, success: true, data: routeAssets };
      return next(null, req, res, next);
    } catch (ex) {
      console.error(ex);
      res.status(500);
      res.body = { status: 500, success: false, data: ex };
      return next(null, req, res, next);
    }
  },

  async updatePairs(req, res, next) {
    try {
      const RedisClient = await redisHelper.connect();

      const web3 = new Web3(config.web3.provider);
      const multicall = new Multicall({
        multicallAddress: CONTRACTS.MULTICALL_ADDRESS,
        provider: web3,
      });

      const factoryContract = new web3.eth.Contract(
        CONTRACTS.FACTORY_ABI,
        CONTRACTS.FACTORY_ADDRESS
      );
      const gaugesContract = new web3.eth.Contract(
        CONTRACTS.GAUGES_ABI,
        CONTRACTS.GAUGES_ADDRESS
      );
      console.log("FACTORY:", CONTRACTS.FACTORY_ADDRESS);
      console.log("GAUGES:", CONTRACTS.GAUGES_ADDRESS);
      const [allPairsLength, totalWeight] = await Promise.all([
        factoryContract.methods.allPairsLength().call(),
        gaugesContract.methods.totalWeight().call(),
      ]);

      const arr = Array.from({ length: parseInt(allPairsLength) }, (v, i) => i);

      const ps = await Promise.all(
        arr.map(async (idx) => {
          const pairAddress = await factoryContract.methods
            .allPairs(idx)
            .call();

          const pairContract = new web3.eth.Contract(
            CONTRACTS.PAIR_ABI,
            pairAddress
          );

          const [
            reserves,
            token0Address,
            token1Address,
            totalSupply,
            symbol,
            decimals,
            stable,
            gaugeAddress,
            gaugeWeight,
          ] = await multicall.aggregate([
            pairContract.methods.getReserves(),
            pairContract.methods.token0(),
            pairContract.methods.token1(),
            pairContract.methods.totalSupply(),
            pairContract.methods.symbol(),
            pairContract.methods.decimals(),
            pairContract.methods.stable(),
            gaugesContract.methods.gauges(pairAddress),
            gaugesContract.methods.weights(pairAddress),
          ]);

          // console.log(
          //   reserves,
          //   token0Address,
          //   token1Address,
          //   totalSupply,
          //   symbol,
          //   decimals,
          //   stable,
          //   gaugeAddress,
          //   gaugeWeight
          // );

          const token0 = await model._getBaseAsset(web3, token0Address);
          const token1 = await model._getBaseAsset(web3, token1Address);

          // console.log(token0, token1);

          const thePair = {
            address: pairAddress,
            symbol: symbol,
            decimals: parseInt(decimals),
            isStable: stable,
            token0: token0,
            token1: token1,
            totalSupply: BigNumber(totalSupply)
              .div(10 ** decimals)
              .toFixed(parseInt(decimals)),
            reserve0: BigNumber(reserves[0])
              .div(10 ** decimals)
              .toFixed(parseInt(decimals)),
            reserve1: BigNumber(reserves[1])
              .div(10 ** decimals)
              .toFixed(parseInt(decimals)),
          };

          if (gaugeAddress !== ZERO_ADDRESS) {
            const gaugeContract = new web3.eth.Contract(
              CONTRACTS.GAUGE_ABI,
              gaugeAddress
            );
            console.log("Gauge address:", gaugeAddress);
            const [
              gaugeTotalSupply,
              internalBribeAddress,
              externalBribeAddress,
            ] = await multicall.aggregate([
              gaugeContract.methods.totalSupply(),
              gaugesContract.methods.internal_bribes(gaugeAddress),
              gaugesContract.methods.external_bribes(gaugeAddress),
            ]);

            const internalBribeContract = new web3.eth.Contract(
              CONTRACTS.BRIBE_ABI,
              internalBribeAddress
            );
            const externalBribeContract = new web3.eth.Contract(
              CONTRACTS.BRIBE_ABI,
              externalBribeAddress
            );

            const [internalBribeTokensLength, externalBribeTokensLength] =
              await multicall.aggregate([
                internalBribeContract.methods.rewardsListLength(),
                externalBribeContract.methods.rewardsListLength(),
              ]);
            console.log(
              "token lengths:",
              internalBribeTokensLength,
              externalBribeTokensLength
            );
            const arry = Array.from(
              { length: parseInt(internalBribeTokensLength) },
              (v, i) => i
            );
            //FIXME: manage externalBribes as well!
            let bribes = await Promise.all(
              arry.map(async (idx) => {
                const tokenAddress = await internalBribeContract.methods
                  .rewards(idx)
                  .call();
                console.log("Bribe token address:", tokenAddress);
                const token = await model._getBaseAsset(web3, tokenAddress);
                //FIXME: rewardRate has to be found <- looks like this is the rewards per second
                // const rewardRate = await bribeContract.methods
                //   .rewardRate(tokenAddress)
                //   .call();

                return {
                  token: token,
                  rewardRate: 1,
                  rewardAmount: 1,
                  //FIXME: if rewardRate is gathered uncomment this again and delete constant values.
                  // rewardRate: BigNumber(rewardRate)
                  //   .div(10 ** token.decimals)
                  //   .toFixed(token.decimals),
                  // rewardAmount: BigNumber(rewardRate)
                  //   .times(604800)
                  //   .div(10 ** token.decimals)
                  //   .toFixed(token.decimals),
                };
              })
            );

            bribes = bribes.filter((bribe) => {
              return bribe.token.isWhitelisted;
            });

            thePair.gauge = {
              address: gaugeAddress,
              bribeAddress: internalBribeAddress,
              externalBribeAddress: externalBribeAddress,
              decimals: 18,
              totalSupply: BigNumber(gaugeTotalSupply)
                .div(10 ** 18)
                .toFixed(18),
              reserve0:
                thePair.totalSupply > 0
                  ? BigNumber(thePair.reserve0)
                      .times(gaugeTotalSupply)
                      .div(totalSupply)
                      .toFixed(thePair.token0.decimals)
                  : "0",
              reserve1:
                thePair.totalSupply > 0
                  ? BigNumber(thePair.reserve1)
                      .times(gaugeTotalSupply)
                      .div(totalSupply)
                      .toFixed(thePair.token1.decimals)
                  : "0",
              weight: BigNumber(gaugeWeight)
                .div(10 ** 18)
                .toFixed(18),
              weightPercent: BigNumber(totalWeight).gt(0)
                ? BigNumber(gaugeWeight).times(100).div(totalWeight).toFixed(2)
                : 0,
              bribes: bribes,
            };
          }
          // console.log(thePair);
          return thePair;
        })
      );

      const done = await RedisClient.set("pairs", JSON.stringify(ps));

      res.status(205);
      res.body = { status: 200, success: true, data: ps };
      return next(null, req, res, next);
    } catch (ex) {
      console.error(ex);
      res.status(500);
      res.body = { status: 500, success: false, data: ex };
      return next(null, req, res, next);
    }
  },

  async _getBaseAsset(web3, address) {
    try {
      const RedisClient = await redisHelper.connect();

      const multicall = new Multicall({
        multicallAddress: CONTRACTS.MULTICALL_ADDRESS,
        provider: web3,
      });

      const ba = await RedisClient.get("baseAssets");
      const baseAssets = JSON.parse(ba);

      // console.log("-->", baseAssets);

      let xa = await RedisClient.get("extraAssets");
      if (!xa || xa.length === 0) {
        xa = "[]";
      }
      const extraAssets = JSON.parse(xa);

      // console.log("xx>", extraAssets);

      const allAssets = [...baseAssets, ...extraAssets];

      const theBaseAsset = allAssets.filter((as) => {
        return as.address.toLowerCase() === address.toLowerCase();
      });
      if (theBaseAsset.length > 0) {
        const gaugesContract = new web3.eth.Contract(
          CONTRACTS.GAUGES_ABI,
          CONTRACTS.GAUGES_ADDRESS
        );
        const isWhitelisted = await gaugesContract.methods
          .isWhitelisted(address)
          .call();

        let returnAsset = theBaseAsset[0];
        returnAsset.isWhitelisted = isWhitelisted;
        return returnAsset;
      }

      const gaugesContract = new web3.eth.Contract(
        CONTRACTS.GAUGES_ABI,
        CONTRACTS.GAUGES_ADDRESS
      );
      const baseAssetContract = new web3.eth.Contract(
        CONTRACTS.ERC20_ABI,
        address
      );

      const [symbol, decimals, name, isWhitelisted] = await multicall.aggregate(
        [
          baseAssetContract.methods.symbol(),
          baseAssetContract.methods.decimals(),
          baseAssetContract.methods.name(),
          gaugesContract.methods.isWhitelisted(address),
        ]
      );

      const newBaseAsset = {
        address: address,
        symbol: symbol,
        name: name,
        decimals: parseInt(decimals),
        chainId: config.chainId,
        logoURI: null,
        isWhitelisted: isWhitelisted,
      };

      console.log("-->", newBaseAsset);

      extraAssets.push(newBaseAsset);

      const done = await RedisClient.set(
        "extraAssets",
        JSON.stringify(extraAssets)
      );

      return newBaseAsset;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },

  async getPairs(req, res, next) {
    try {
      const RedisClient = await redisHelper.connect();

      const reply = await RedisClient.get("pairs");
      const pairs = JSON.parse(reply);

      res.status(205);
      res.body = { status: 200, success: true, data: pairs };
      return next(null, req, res, next);
    } catch (ex) {
      console.error(ex);
      res.status(500);
      res.body = { status: 500, success: false, data: ex };
      return next(null, req, res, next);
    }
  },
};

module.exports = model;
