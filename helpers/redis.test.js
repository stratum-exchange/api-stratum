const { connect } = require('./redis');

(async () => {
  const client = await connect();
  console.log('Redis client:', client);
  // Perform Redis operations using the client
})();
