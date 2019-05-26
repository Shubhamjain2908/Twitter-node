'use strict';

const Model = require('objection').Model;

class Like extends Model {

  static get tableName() {
    return 'like_tweet';
  }

  static get relationMappings() {
    return {
      tweet: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tweets',
        join: {
          from: 'like_tweet.tweetId',
          to: 'tweets.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'like_tweet.userId',
          to: 'user.id'
        }
      },
    }
  }
}

module.exports = Like;