'use strict';

const Follow = require('../models/Follow');
const Tweets = require('../models/Tweets');
const Like = require('../models/Like');

const createTweet = async (req, res) => {
    const body = req.body;
    let data = {
        userId: req.user.id,
        tweet: body.tweet
    }
    let insertedTweet = await Tweets.query().insertAndFetch(data);
    return createdResponse(res, insertedTweet, 'Tweet created successfully!');
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

const likeTweet = async (req, res) => {
    let userId = req.user.id;
    let tweetId = req.body.tweetId;

    if (!tweetId) {
        throw badRequestError('Request expexts an tweet Id!');
    }

    let tweetExists = await Tweets.query().where('id', tweetId);
    if (!tweetExists) {
        throw notFoundError('No Tweet Found with this Id!');
    }

    let alreadyLiked = await Like.query().where('tweetId', tweetId).where('userId', userId).first();
    if (alreadyLiked) {
        throw badRequestError('You have Already liked this tweet!');
    }
    const data = {
        tweetId: tweetId,
        userId: userId
    }
    const like = await Likes.query().insertAndFetch(data);
    return createdResponse(res, like, 'Tweet liked!');
}

const unLikeTweet = async (req, res) => {
    let userId = req.user.id;
    let tweetId = req.body.tweetId;

    if (!tweetId) {
        throw badRequestError('Request expexts an tweet Id!');
    }

    let tweetExists = await Tweets.query().where('id', tweetId);
    if (!tweetExists) {
        throw notFoundError('No Tweet Found with this Id!');
    }

    let QUERY = Like.query().where('tweetId', tweetId).where('userId', userId).first();
    let exists = await QUERY;
    if (!exists) {
        return badRequestError(res, 'You have not liked this tweet');
    }
    await QUERY.del();
    return successResponse(res, 200, null, 'Unliked successfully');
}

module.exports = {
    createTweet,
    fetchUserFeed,
    getUserTweets,
    deleteTweet,
    likeTweet,
    unLikeTweet
}