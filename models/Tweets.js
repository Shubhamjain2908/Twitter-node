'use strict';

const Model = require('objection').Model;

class Tweets extends Model {

    static get tableName() {
        return 'tweets';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['tweet'],

            properties: {
                tweet: {
                    type: 'string'
                },
                retweetId: {
                    type: ['integer', 'null']
                }
            }
        }
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'tweets.userId',
                    to: 'user.id'
                }
            },
            parent: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Tweets',
                join: {
                    from: 'tweets.parentId',
                    to: 'tweets.id'
                }
            },
            children: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Tweets',
                join: {
                    from: 'tweets.id',
                    to: 'tweets.parentId'
                }
            },
        }
    }
}

module.exports = Tweets