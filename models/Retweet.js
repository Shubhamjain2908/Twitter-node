const Model = require('objection').Model;

class Retweet extends Model {

    static get tableName() {
        return 'retweet';
    }

    static get relationMappings() {
        return {
            tweet: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Tweets',
                join: {
                    from: 'retweet.tweetId',
                    to: 'tweets.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'retweet.userId',
                    to: 'user.id'
                }
            },
        }
    }
}

module.exports = Retweet;