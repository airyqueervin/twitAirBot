const express = require('express');
const app = express();
const port = process.env.port || 8300;
const Twitter = require('twitter');
const twitKeys = require('./config/config.js');

const twit = new Twitter({
  consumer_key: twitKeys.config.csKey, 
  consumer_secret: twitKeys.config.csSecret,
  access_token_key: twitKeys.config.accessToken,
  access_token_secret: twitKeys.config.accessTokenSecret
});

// console.log(twit)

app.get('/*', (req, res) => {
  res.send('Hello World');
});

const server = app.listen(port, () => {
  console.log('TwitAirBot is listening on port' + port);
});




const latestMentions = [];
const idStrings = {};

const getMentions = () => {
  twit.get('statuses/mentions_timeline.json', { count: 10}, function(err, data, res){
    if (err) {
      console.log('ERROR OCCURED WITH TWIT GET', err);
    }
    data.forEach(tweet => {
      if (data.length) {
        idStrings[tweet.id_str] = true;
        let tweetObj = {};
        tweetObj.user = tweet.user.screen_name;
        tweetObj.text = tweet.text;
        latestMentions.push(tweetObj);
        replyToMentions();  
      } else {
        console.log('Twitter Data', data);
      }
    });
    console.log('ID STRINGS', idStrings);
    console.log('LATEST MENTIONS', latestMentions);
  });
};

// getMentions();

const replyToMentions = () => {
  latestMentions.forEach(mention => {
    let responseTweet = 'Hello @';
    responseTweet += mention.user;
    responseTweet += '\n I hope you are having a wonderful day! \n-Your Favorite TwitAir Bot';
    twit.post('statuses/update', {status: responseTweet}, function (err, tweet, res) {
      if (err) {
        console.log('ERROR IN REPLY', err);
      } 
      console.log('reply tweet', tweet);
      console.log('reply resposne', res);
      console.log('Succesful response,', responseTweet);
    });
  });
};
