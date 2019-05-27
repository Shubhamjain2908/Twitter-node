const Follow = require('../models/Follow');
const User = require('../models/User');

const followUser = async (req, res) => {
    const followerId = req.user.id;
    const followedUserId = req.body.id;

    if (!followedUserId) {
        return badRequestError(res, 'Request expexts an followed user Id!');
    }

    if (followerId == followedUserId) {
        return badRequestError(res, 'You cannot follow yourself!');
    }

    const followedUserExists = await User.query().skipUndefined().where('id', followedUserId).first();
    if (!followedUserExists) {
        return ReE(res, 'No user found to follow with this user Id', 404);
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

    if (!followedUserId) {
        return badRequestError(res, 'Request expexts an followed user Id!');
    }

    if (followerId == followedUserId) {
        return badRequestError(res, 'You cannot unfollow yourself!');
    }

    const followedUserExists = await User.query().skipUndefined().where('id', followedUserId).first();
    if (!followedUserExists) {
        return ReE(res, 'No user found with this user Id', 404);
    }

    let QUERY = Follow.query().where('follower', followerId).where('followedUser', followedUserId).first();
    let exists = await QUERY;
    if (!exists) {
        return badRequestError(res, 'You were not following this user');
    }
    await QUERY.del();
    return successResponse(res, 200, null, 'Unfollowed successfully');
}

module.exports = {
    followUser,
    unFollowUser
}