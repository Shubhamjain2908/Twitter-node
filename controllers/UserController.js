const Follow = require('../models/Follow');
const User = require('../models/User');

const followUser = async (req, res) => {
    const followerId = req.user.id;
    const followedUserId = req.body.id;

    if (!followedUserId || isNaN(followedUserId)) {
        return badRequestError(res, 'Request expects an followed user Id: Of Integer type only!');
    }

    if (followerId == followedUserId) {
        return badRequestError(res, 'You cannot follow yourself!');
    }

    const followedUserExists = await User.query().skipUndefined().where('id', followedUserId).first();
    if (!followedUserExists) {
        return notFoundError(res, 'No user found to follow with this user Id');
    }

    let data = {
        follower: followerId,
        followedUser: followedUserId
    }

    let followUser = await Follow.query().insertAndFetch(data);
    return createdResponse(res, followUser, 'Successfully following the user');
}

const unFollowUser = async (req, res) => {
    const followerId = req.user.id;
    const followedUserId = req.body.id;

    if (!followedUserId || isNaN(followedUserId)) {
        return badRequestError(res, 'Request expects an followed user Id: Of Integer type only!');
    }

    if (followerId == followedUserId) {
        return badRequestError(res, 'You cannot unfollow yourself!');
    }

    const followedUserExists = await User.query().skipUndefined().where('id', followedUserId).first();
    if (!followedUserExists) {
        return notFoundError(res, 'No user found with this user Id');
    }

    let QUERY = Follow.query().where('follower', followerId).where('followedUser', followedUserId).first();
    let exists = await QUERY;
    if (!exists) {
        return badRequestError(res, 'You were not following this user');
    }
    await QUERY.del();
    return successResponse(res, 200, null, 'Unfollowed successfully');
}

const getFollowers = async (req, res) => {
    const userId = req.user.id;
    const followers = await User.query().skipUndefined()
        .whereRaw('id in (SELECT "follow"."follower" FROM follow WHERE "follow"."followedUser" = ?)', userId)
    return successResponse(res, 200, followers, 'Successfully get the followers');
}

const getFollowedUser = async (req, res) => {
    const userId = req.user.id;
    const followers = await User.query().skipUndefined()
        .whereRaw('id in (SELECT "follow"."followedUser" FROM follow WHERE "follow"."follower" = ?)', userId)
    return successResponse(res, 200, followers, 'Successfully get the followers');
}

const getUserDetails = async (req, res) => {
    const userId = req.user.id;
    const profile = await User.query().skipUndefined().where('id', userId)
        .eager('[userFollowers, userFollowing, tweets]')
        .modifyEager('tweets', builder => {
            builder.orderBy('created_at', 'DESC');
        });
    return okResponse(res, profile);
}

module.exports = {
    followUser,
    unFollowUser,
    getFollowers,
    getFollowedUser,
    getUserDetails
}