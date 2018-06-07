module.exports = function(tweet, replies) {
    var userName = tweet.user.screen_name;
    var index = Math.round(Math.random() * (replies.length - 1));
    var reply = '@' + userName + ' ' + replies[index];
    return reply;
};