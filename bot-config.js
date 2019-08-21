// Put the keys and tokens of your Twitter account
const client = {
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_KEY,
	access_token_secret: process.env.TWITTER_ACCES_SECRET
};

// Put your key words to filter the tweets
// Example: '#cats, #dogs, meow'
const track = '';

// Put the user name of your Twitter account
// Example: 'cat_bot'
const userName = '';

// Put your possible replies
// Example: ['your dog is amazing!', 'this cat is so cute!', 'meow meow meow']
const replies = [ 'Dale marito' ];

module.exports = {
	client,
	track,
	userName,
	replies
};
