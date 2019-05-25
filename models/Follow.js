const Model = require('objection').Model;
const ValidationError = require('objection').ValidationError;


class Follow extends Model {

    static get tableName() {
        return 'follow';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['follower', 'followedUser']
        }
    }

    async $beforeInsert() {
        await super.$beforeInsert;
        let alreadyFollow = await this.constructor.query().where('follower', this.follower).andWhere('followedUser', this.followedUser).first();
        if (alreadyFollow) {
            throw new ValidationError({
                message: "Already Following!",
                type: "ModelValidation",
                data: {
                    message: "You are already following this user!",
                    code: 406,
                    status: "error"
                }
            });
        }
    }
}

module.exports = Follow;