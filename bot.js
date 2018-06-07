const Twitter = require('twitter');
const randomReply = require('./random-reply');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_KEY,
    access_token_secret: process.env.TWITTER_ACCES_SECRET
});

// Put your key words to track the tweets
// Example: '#cats, #dogs, meow'
const track = '';

// Put the user name of the Twitter account
// Example: 'cat_bot'
const userName = '';

// Put your possible replies
// Example: ['your dog is amazing!', 'this cat is so cute!', 'meow meow meow']
const replies = [];

// Config the stream to filter the tweets with our key words
const stream = client.stream('statuses/filter', {track: track});

// Each time the stream get a tweet, reply it with a random phrase
stream.on('data', (tweet) => {

    // dont allow reply himself
    if (tweet.user.screen_name === userName) {
        return;
    }
    
    // Create the new random reply
    var newReply = {
        status: randomReply(tweet, replies),
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