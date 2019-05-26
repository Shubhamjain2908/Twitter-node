const Follow = require('../models/Follow');
const Tweets = require('../models/Tweets');

const createTweet = async (req, res) => {
    const body = req.body;
    let data = {
        userId: req.user.id,
        tweet: body.tweet
    }
    let insertedTweet = await Tweets.query().insertAndFetch(data);
    return createdResponse(res, insertedTweet);
}

const deleteTweet = async (req, res) => {
    let id = req.params.id;
    const tweetExists = await Tweets.query().where('id', id).first();
    if (tweetExists) {
        await Tweets.query().deleteById(id);
        return noContentResponse(res);
    } else {
        throw badRequestError('No Tweet exist with this id!');
    }
}

const fetchUserFeed = async (req, res) => {
    let userId = await Follow.query().select('followedUser').where('follower', req.user.id).then(
        (a) => {
            return a.map(c => {
                return c.followedUser
            });
        }
    );
    let tweets = [];
    if (userId.length > 0) {
        tweets = await Tweets.query().whereIn('userId', userId).orderBy('created_at', 'DESC');
    }
    return okResponse(res, tweets);
}

const getUserTweets = async (req, res) => {
    let tweets = await Tweets.query().where('userId', req.user.id).orderBy('created_at', 'DESC');
    return okResponse(res, tweets);
}

module.exports = {
    createTweet,
    fetchUserFeed,
    getUserTweets,
    deleteTweet
}