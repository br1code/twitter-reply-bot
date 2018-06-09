const Twitter = require('twitter');
const randomReply = require('./random-reply');
const botConfig = require('./bot-config');

const client = new Twitter({
    consumer_key: botConfig.client.consumer_key,
    consumer_secret: botConfig.client.consumer_secret,
    access_token_key: botConfig.client.access_token_key,
    access_token_secret: botConfig.client.access_token_secret
});

// Config the stream to filter the tweets with our key words
const stream = client.stream('statuses/filter', {track: botConfig.track});

// Each time the stream get a tweet, reply it with a random phrase
stream.on('data', (tweet) => {

    // dont allow reply himself
    if (tweet.user.screen_name === botConfig.userName) {
        return;
    }
    
    // Create the new random reply
    var newReply = {
        status: randomReply(tweet, botConfig.replies),
        in_reply_to_status_id: tweet.id_str
    };

    // Send the new reply
    client.post('statuses/update', newReply, (err, twt, res) => {
        if (err) return console.log(err);
        console.log(`Tweet ID: ${tweet.id_str} Reply! - "${tweet.text}"`);
    });

});

stream.on('error', (err) => {
    console.log(err);
});

console.log('The Bot is ready, waiting for tweets ...');