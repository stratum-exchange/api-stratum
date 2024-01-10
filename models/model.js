const request = require("request-promise");
const CoinGecko = require("coingecko-api");
const Web3 = require("web3");
const config = require("../config");
const redisHelper = require("../helpers/redis");
const BigNumber = require("bignumber.js");
const fs = require("fs");
const Multicall = require("@dopex-io/web3-multicall");
const axios = require("axios");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const CoinGeckoClient = new CoinGecko();

let no_wrapped_bribe_Counter = 0;

let CONTRACTS = null;
let tokenlistpath = null;
if (config.testnet === "1") {
  CONTRACTS = require(`../constants/${config.chain.toLowerCase()}/contractsTestnet.js`);
  tokenlistpath = `constants/${config.chain.toLowerCase()}/testnet-token-list.json`;
} else {
  CONTRACTS = require(`../constants/${config.chain.toLowerCase()}/contracts.js`);
  tokenlistpath = `../constants/${config.chain.toLowerCase()}/token-list.json`;
}

const jsonStore = {
  airdrop: { size: 0, data: null },
};

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
  async _fileserverLocalAccess(type) {
    const url = config.files[type];
    if (url !== undefined) {
      //add request timestamp to always get am updated version of the file
      const v = `v=${new Date().getMilliseconds}`;
      const response = await axios.get(`${url}?${v}`);
      if (
        jsonStore[type] === null ||
        jsonStore[type] === undefined ||
        jsonStore[type].data === null ||
        jsonStore[type].size === null
      ) {
        console.log(
          `Update server data [ ${response.headers["content-length"]}]`
        );
        jsonStore[type] = {};
        jsonStore[type].data = response.data;
        jsonStore[type].size = response.headers["content-length"];
      } else if (response.headers["content-length"] !== jsonStore[type].size) {
        console.log(
          `Update server data [${jsonStore[type].size}, ${response.headers["content-length"]}]`
        );
        jsonStore[type].data = response.data;
        jsonStore[type].size = response.headers["content-length"];
      }
    }
  },
  async fileserver(req, res, next) {
    const type = req.params.type;

    try {
      await model._fileserverLocalAccess(type);
      // //add request timestamp to always get am updated version of the file
      // const v = `v=${new Date().getMilliseconds}`;
      // const response = await axios.get(`${url}?${v}`);
      // if (
      //   jsonStore[type] === null ||
      //   jsonStore[type] === undefined ||
      //   jsonStore[type].data === null ||
      //   jsonStore[type].size === null
      // ) {
      //   console.log(
      //     `Update server data [ ${response.headers["content-length"]}]`
      //   );
      //   jsonStore[type] = {};
      //   jsonStore[type].data = response.data;
      //   jsonStore[type].size = response.headers["content-length"];
      // } else if (response.headers["content-length"] !== jsonStore[type].size) {
      //   console.log(
      //     `Update server data [${jsonStore[type].size}, ${response.headers["content-length"]}]`
      //   );
      //   jsonStore[type].data = response.data;
      //   jsonStore[type].size = response.headers["content-length"];
      // }
      res.status(201);
      res.body = { status: 201, success: true, data: jsonStore[type].data };
      return next(null, req, res, next);
    } catch (error) {
      res.status(500);
      res.body = { status: 500, success: false };
      return next(null, req, res, next);
    }
  },

  async updateAssets(req, res, next) {
    try {
      // if (config.testnet === "1") {
      const type = "tokenlists";
      await model._fileserverLocalAccess(type);
      const jsonData = jsonStore[type];
      console.log("jsontokenlists >>", jsonStore[type]);
      // let rawdata = fs.readFileSync(tokenlistpath);
      let tokenList = jsonData.data;
      // console.log(tokenList);
      const RC = await redisHelper.connect();
      const d = await RC.set("baseAssets", JSON.stringify(tokenList));
      console.log("RC >>", d);
      res.status(205);
      res.body = { status: 200, success: true, data: tokenList };
      return next(null, req, res, next);
      //FIXME: check on mainnet if anything break, but prices are gathered from FE, too.
      // } else {
      //   let rawdata = fs.readFileSync("token-list.json");
      //   let tokenList = JSON.parse(rawdata);

      //   const RC = await redisHelper.connect();

      //   const reply = await RC.get("pairs");
      //   const pairs = JSON.parse(reply);
      //   const tokenListWithBalances = await model._getAssetPrices(
      //     tokenList,
      //     pairs
      //   );

      //   const d = await RC.set("baseAssets", JSON.stringify(tokenList));

      //   res.status(205);
      //   res.body = { status: 200, success: true, data: tokenList };
      //   return next(null, req, res, next);
      // }
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
      let baseAssets = JSON.parse(reply);

      if (!baseAssets) {
        await model.updateAssets(req, res, next);
        const updatedReply = await RedisClient.get("baseAssets");
        baseAssets = JSON.parse(updatedReply);
      }

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

      const web3 = new Web3(
        new Web3.providers.HttpProvider(config.web3.provider)
      );
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
      console.log(
        "FACTORY:",
        CONTRACTS.FACTORY_ADDRESS,
        await gaugesContract.methods.totalWeight().call()
      );
      // console.log("GAUGES:", CONTRACTS.GAUGES_ADDRESS);
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

          let thePair = null;
          let gaugeAddress = null;
          let gaugeWeight = null;
          let is3Pool = false;
          try {
            is3Pool = await factoryContract.methods.is3pool(pairAddress).call();
            console.log("pairAddress:", pairAddress, is3Pool);
          } catch (error) {
            is3pool = false;
          }
          if (is3Pool) {
            // if 3pool handle pool information
            const pool3Contract = new web3.eth.Contract(
              CONTRACTS.POOL3_ROUTER_ABI,
              pairAddress
            );
            console.log("call 3pool function");
            // const tokenArr = await pool3Contract.methods
            //   .getTokensArray()
            //   .call();

            // const reserve0 = await pool3Contract.methods
            //   .getTokenBalance(0)
            //   .call();
            // const reserve1 = await pool3Contract.methods
            //   .getTokenBalance(1)
            //   .call();
            // const reserve2 = await pool3Contract.methods
            //   .getTokenBalance(2)
            //   .call();
            // console.log(tokenArr);
            const [tokenArr, reserve0, reserve1, reserve2] =
              await multicall.aggregate([
                pool3Contract.methods.getTokensArray(),
                pool3Contract.methods.getTokenBalance(0),
                pool3Contract.methods.getTokenBalance(1),
                pool3Contract.methods.getTokenBalance(2),
              ]);
            const token0 = await model._getBaseAsset(web3, tokenArr[0]);
            const token1 = await model._getBaseAsset(web3, tokenArr[1]);
            const token2 = await model._getBaseAsset(web3, tokenArr[2]);
            console.log(token0, token1, token2, reserve0, reserve1, reserve2);
            const swapStorage = await pool3Contract.methods
              .swapStorage()
              .call();

            const lpTokenContract = new web3.eth.Contract(
              CONTRACTS.LP_TOKEN_ABI,
              swapStorage.lpToken
            );
            // const symbol = await lpTokenContract.methods.symbol().call();
            // const decimals = await lpTokenContract.methods.decimals().call();
            // const totalSupply = await lpTokenContract.methods
            //   .totalSupply()
            //   .call();
            const [decimals, symbol, totalSupply, _gaugeAddress, _gaugeWeight] =
              await multicall.aggregate([
                lpTokenContract.methods.decimals(),
                lpTokenContract.methods.symbol(),
                lpTokenContract.methods.totalSupply(),
                gaugesContract.methods.gauges(swapStorage.lpToken), // is swapStorage.lpToken, but ZERO Adress is good for testing
                gaugesContract.methods.weights(swapStorage.lpToken),
              ]);
            console.log(
              symbol,
              decimals,
              totalSupply,
              _gaugeAddress,
              _gaugeWeight
            );

            gaugeAddress = _gaugeAddress;
            gaugeWeight = _gaugeWeight;

            thePair = {
              address: pairAddress,
              symbol: symbol,
              decimals: parseInt(decimals),
              stable: true,
              token0: token0,
              token1: token1,
              token2: token2,
              lpToken: swapStorage.lpToken,
              is3pool: true,
              totalSupply: BigNumber(totalSupply)
                .div(10 ** decimals)
                .toFixed(parseInt(decimals)),
              reserve0: BigNumber(reserve0)
                .div(10 ** decimals)
                .toFixed(parseInt(decimals)),
              reserve1: BigNumber(reserve1)
                .div(10 ** decimals)
                .toFixed(parseInt(decimals)),
              reserve2: BigNumber(reserve2)
                .div(10 ** decimals)
                .toFixed(parseInt(decimals)),
            };
          } else {
            // we expect pairs here
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
              _gaugeAddress,
              _gaugeWeight,
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

            const token0 = await model._getBaseAsset(web3, token0Address);
            const token1 = await model._getBaseAsset(web3, token1Address);
            gaugeAddress = _gaugeAddress;
            gaugeWeight = _gaugeWeight;

            thePair = {
              address: pairAddress,
              symbol: symbol,
              decimals: parseInt(decimals),
              stable: stable,
              token0: token0,
              token1: token1,
              is3pool: false,
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
          }

          console.log(gaugeAddress, ZERO_ADDRESS);

          if (gaugeAddress !== ZERO_ADDRESS) {
            const gaugeContract = new web3.eth.Contract(
              CONTRACTS.GAUGE_ABI,
              gaugeAddress
            );
            // console.log("Gauge address:", gaugeAddress);
            const [
              gaugeTotalSupply,
              internalBribeAddress,
              externalBribeAddress,
            ] = await multicall.aggregate([
              gaugeContract.methods.totalSupply(),
              gaugesContract.methods.internal_bribes(gaugeAddress),
              gaugesContract.methods.external_bribes(gaugeAddress),
            ]);

            //External wrapped bribe code that needs to be executed to fetch the external bribe values
            let wrappedBribeAddress = null;
            if (![ZERO_ADDRESS, null].includes(externalBribeAddress)) {
              const wrappedBribeFactoryContract = new web3.eth.Contract(
                CONTRACTS.WRAPPED_BRIBE_ABI,
                CONTRACTS.WRAPPED_BRIBE_FACTORY_ADDRESS
              );

              wrappedBribeAddress = await wrappedBribeFactoryContract.methods
                .oldBribeToNew(externalBribeAddress)
                .call();
              console.log("WBA:", gaugeAddress, wrappedBribeAddress);
              if ([ZERO_ADDRESS, ""].includes(wrappedBribeAddress)) {
                throw Error(
                  "Internal error: wxBribe should always be initialized!"
                );
                // await model.createWrappedBribe(
                //   externalBribeAddress,
                //   no_wrapped_bribe_Counter
                // );
                // wrappedBribeAddress = await wrappedBribeFactoryContract.methods
                //   .oldBribeToNew(externalBribeAddress)
                //   .call();
              }

              //add when gauge is created! see below
              // data["wrapped_bribe_address"] = wrappedBribeAddress;
            }

            // const internalBribeContract = new web3.eth.Contract(
            //   CONTRACTS.BRIBE_ABI,
            //   internalBribeAddress
            // );
            // const externalBribeContract = new web3.eth.Contract(
            //   CONTRACTS.BRIBE_ABI,
            //   externalBribeAddress
            // );

            // const [internalBribeTokensLength, externalBribeTokensLength] =
            //   await multicall.aggregate([
            //     internalBribeContract.methods.rewardsListLength(),
            //     externalBribeContract.methods.rewardsListLength(),
            //   ]);

            // const getBribes = async (bribeContract, gaugeContract, arry) => {
            //   //FIXME: manage externalBribes as well!
            //   let bribes = await Promise.all(
            //     arry.map(async (idx) => {
            //       const tokenAddress = await bribeContract.methods
            //         .rewards(idx)
            //         .call();
            //       // console.log("Bribe token address:", tokenAddress);
            //       const token = await model._getBaseAsset(web3, tokenAddress);
            //       //FIXME: rewardRate has to be found <- looks like this is the rewards per second
            //       let rewardRate;
            //       try {
            //         rewardRate = await bribeContract.methods
            //           .left(tokenAddress)
            //           .call();

            //         // console.log(
            //         //   `Bribe: ${tokenAddress} for ${rewardRate} Token`
            //         // );
            //         //FIXME: This might be right for fees (internal bribes)
            //         // rewardRate = await gaugeContract.methods
            //         //   .rewardRate(tokenAddress)
            //         //   .call();
            //       } catch (error) {
            //         console.log(
            //           `this address ${tokenAddress} produced this error: ${error}`
            //         );
            //       }

            //       //FIXME: if rewardRate is gathered uncomment this again and delete constant values.

            //       return {
            //         token: token,
            //         rewardRate: BigNumber(rewardRate)
            //           .div(10 ** token.decimals)
            //           .toFixed(token.decimals),
            //         rewardAmount: BigNumber(rewardRate)
            //           .div(10 ** token.decimals)
            //           .toFixed(token.decimals),
            //       };
            //     })
            //   );
            //   return bribes;
            // };

            // const arry1 = Array.from(
            //   { length: parseInt(externalBribeTokensLength) },
            //   (v, i) => i
            // );

            // let externalBribes = await getBribes(
            //   externalBribeContract,
            //   gaugeContract,
            //   arry1
            // );

            // externalBribes = externalBribes.filter((bribe) => {
            //   return bribe.token.isWhitelisted;
            // });

            thePair.gauge = {
              address: gaugeAddress,
              bribeAddress: externalBribeAddress,
              internalBribeAddress: internalBribeAddress,
              wrapped_bribe_address: wrappedBribeAddress,
              decimals: 18,
              totalSupply: BigNumber(gaugeTotalSupply)
                .div(10 ** 18)
                .toFixed(18),
              reserve0:
                thePair.totalSupply > 0
                  ? BigNumber(thePair.reserve0)
                    .times(gaugeTotalSupply)
                    .div(thePair.totalSupply)
                    .toFixed(thePair.token0.decimals)
                  : "0",
              reserve1:
                thePair.totalSupply > 0
                  ? BigNumber(thePair.reserve1)
                    .times(gaugeTotalSupply)
                    .div(thePair.totalSupply)
                    .toFixed(thePair.token1.decimals)
                  : "0",
              reserve2:
                thePair.totalSupply > 0 && thePair.token2
                  ? BigNumber(thePair.reserve2)
                    .times(gaugeTotalSupply)
                    .div(thePair.totalSupply)
                    .toFixed(thePair.token2.decimals)
                  : "0",
              weight: BigNumber(gaugeWeight)
                .div(10 ** 18)
                .toFixed(18),
              weightPercent: BigNumber(totalWeight).gt(0)
                ? BigNumber(gaugeWeight).times(100).div(totalWeight).toFixed(2)
                : 0,
              // bribes: externalBribes,
              // internalBribes: bribes,
            };

            if (![ZERO_ADDRESS, null].includes(wrappedBribeAddress)) {
              await model.fetchExternalRewards(web3, multicall, thePair.gauge);
              // console.log(thePair.gauge);
            }
            await model.fetchInternalRewards(web3, multicall, thePair);
            // model.updateApr(gauge)
          }
          // console.log("---__>", thePair);
          return thePair;
        })
      );
      no_wrapped_bribe_Counter = 0;
      const done = await RedisClient.set("pairs", JSON.stringify(ps));
      // console.log(JSON.stringify(ps));
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
      let pairs = JSON.parse(reply);

      if (!pairs) {
        await model.updateAssets(req, res, next);
        await model.updatePairs(req, res, next);
        const updatedReply = await RedisClient.get("pairs");
        pairs = JSON.parse(updatedReply);
      }

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
  async priceInfo(req, res, next) {
    res.status(200);
    res.body = { status: 200, sucess: true, data: [] };
    return next(null, req, res, next);
  },
  async incrementNonce(nonce) {
    const newNonce = nonce + no_wrapped_bribe_Counter;
    no_wrapped_bribe_Counter++;
    return newNonce;
  },
  // async createWrappedBribe(bribe_address, idx) {
  //   console.log("create wrapped bribe");
  //   const web3 = new Web3(config.web3.provider);
  //   const account = web3.eth.accounts.privateKeyToAccount(config.PRIVATE_KEY);
  //   // console.log("Account for wrapped bribe creation:", account);
  //   const wrapped_bribe_factory_contract = new web3.eth.Contract(
  //     CONTRACTS.WRAPPED_BRIBE_ABI,
  //     CONTRACTS.WRAPPED_BRIBE_FACTORY_ADDRESS
  //   );
  //   const nonce = await web3.eth.getTransactionCount(account.address);
  //   const newNonce = await model.incrementNonce(nonce);

  //   const checksum_address = web3.utils.toChecksumAddress(bribe_address);
  //   const create_bribe_txn = wrapped_bribe_factory_contract.methods
  //     .createBribe(checksum_address)
  //     .encodeABI();

  //   // const gasPrice = await web3.eth.getGasPrice();
  //   // const gasLimit = await wrapped_bribe_factory_contract.methods
  //   //   .createBribe(checksum_address)
  //   //   .estimateGas();

  //   const txParams = {
  //     // type: "0x0",
  //     to: CONTRACTS.WRAPPED_BRIBE_FACTORY_ADDRESS,
  //     data: create_bribe_txn,
  //     gas: 90000000,
  //     gasPrice: 250000000,
  //     nonce: newNonce, //nonce + idx,
  //     chainId: config.chainId,
  //   };

  //   const signedTx = await web3.eth.accounts.signTransaction(
  //     txParams,
  //     config.PRIVATE_KEY
  //   );

  //   console.log(bribe_address, txParams, nonce, idx);
  //   web3.eth
  //     .sendSignedTransaction(signedTx.rawTransaction)
  //     .on("transactionHash", function (txHash) {
  //       console.log(txHash);
  //     })
  //     .on("receipt", function (receipt) {
  //       console.log(receipt);
  //     })
  //     .on("error", function (error) {
  //       console.error(error);
  //     });
  //   console.log("sentTx");

  //   // LOGGER.info("Created tx:", sentTx.transactionHash);
  // },
  async fetchExternalRewards(web3, multicall, gauge) {
    // console.log("fetchExternalRewards");
    const wrappedBribeContract = new web3.eth.Contract(
      CONTRACTS.BRIBE_ABI,
      gauge.wrapped_bribe_address
    );

    const tokenLen = await wrappedBribeContract.methods
      .rewardsListLength()
      .call();
    // console.log(tokenLen);
    const rewardList = [];

    for (let index = 0; index < tokenLen; index++) {
      const bribeTokenAddress = await wrappedBribeContract.methods
        .rewards(index)
        .call();
      const left = await wrappedBribeContract.methods
        .left(bribeTokenAddress)
        .call();

      rewardList.push({ bribeTokenAddress: bribeTokenAddress, amount: left });
    }
    gauge.bribes = [];
    for (const reward of rewardList) {
      // console.log(reward);
      const amount = Number(reward.amount);
      const token = await model._getBaseAsset(web3, reward.bribeTokenAddress);
      // console.log("bribe token", token);
      const wrappedExternalBribe = {
        token: token,
        rewardAmount: 0,
      };
      if (amount > 0) {
        wrappedExternalBribe.rewardAmount = amount / 10 ** token.decimals;

        if (token.price) {
          gauge.tbv += (amount / 10 ** token.decimals) * token.price;
        }
      }
      gauge.bribes.push(wrappedExternalBribe);
      // console.log(gauge);
    }
  },
  async fetchInternalRewards(web3, multicall, pair) {
    const gauge = pair.gauge;
    const bribeContract = new web3.eth.Contract(
      CONTRACTS.BRIBE_ABI,
      gauge.internalBribeAddress
    );
    // console.log("fetchInternal");
    const data = await multicall.aggregate([
      bribeContract.methods.left(pair.token0.address),
      bribeContract.methods.left(pair.token1.address),
    ]);
    const arr = [
      { token: pair.token0, fee: data[0] },
      { token: pair.token1, fee: data[1] },
    ];
    for (const tokenFee of arr) {
      // console.log(tokenFee, gauge);
      const token = tokenFee.token;
      const fee = tokenFee.fee;
      gauge.rewards = {};
      if (gauge.rewards[token.address]) {
        gauge.rewards[token.address] =
          gauge.rewards[token.address] + fee / 10 ** token.decimals;
      } else if (fee > 0) {
        gauge.rewards[token.address] = fee / 10 ** token.decimals;
      }

      if (token.price) {
        gauge.tbv += (fee / 10 ** token.decimals) * token.price;
      }
    }
  },
};

module.exports = model;
