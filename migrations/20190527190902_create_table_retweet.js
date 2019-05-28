exports.up = async (knex, Promise) => {

    try {
        await knex.schema
            .createTable('retweet', table => {
                table.increments('id').primary();
                table.integer('tweetId')
                    .references('id')
                    .inTable('tweets')
                    .notNullable()
                    .onDelete('CASCADE');
                table.integer('userId')
                    .references('id')
                    .inTable('user')
                    .notNullable()
                    .onDelete('CASCADE');
                table.timestamps(false, true);
            });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('retweet');
};
