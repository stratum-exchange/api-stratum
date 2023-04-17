const config = require("../config");
const redis = require("redis");

const RedisClient = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
  password: config.redis.password
});

let connected = false;

const connect = async () => {
  try {
    try {
      RedisClient.on("ready", async () => {
        const pong = await RedisClient.ping();
        if (pong == "PONG") {
          connected = true;
        }
      });
    } catch (ex) {
      console.log(ex);
    }

    if (!connected) {
      await RedisClient.connect();
    }

    return RedisClient;
  } catch (ex) {
    console.log(ex);
  }
};

const getBaseAssets = async () => {
  const RedisClient = await redisHelper.connect();

  const ba = await RedisClient.get("baseAssets");
  const baseAssets = JSON.parse(ba);
  return baseAssets;
};

module.exports = {
  connect,
  getBaseAssets,
};
