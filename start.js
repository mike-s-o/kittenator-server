require('dotenv').config();

const lodash = require('lodash');
const Redis = require('ioredis');
const redis = new Redis(6379, 'localhost');

const express = require('express');
const PORT = process.env.PORT || 5000;

let server = express();

server.get('/tweets-status/:tweets', async (req, res) => {
  const tweets = validateTweetsIDs(req.params.tweets);
  const results = await redis.mget(tweets.map(t => 'tweet:' + t));
  const jsonOutput = lodash.pickBy(lodash.zipObject(tweets, results));

  res.send(JSON.stringify(jsonOutput));
});

let validateTweetsIDs = param => {
  return ('' + param)
    .split(',')
    .map(id => parseInt(id))
    .filter(id => id);
};

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
