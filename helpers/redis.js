const config = require('../config')
const redis = require('redis');

const RedisClient = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`
})

let connected = false

const connect = async () => {
  try {
    try {
      RedisClient.on('ready', async () => {
        const pong = await RedisClient.ping()
        if(pong == 'PONG') {
          connected = true
        }
    });
    } catch(ex) {
      console.log(ex)
    }

    if(!connected) {
      await RedisClient.connect();
    }

    return RedisClient
  } catch (ex) {
    console.log(ex)
  }
}

module.exports = {
  connect
}
