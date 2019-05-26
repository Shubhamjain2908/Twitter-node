exports.up = async (knex, Promise) => {

    try {
        await knex.schema.createTable('tweets', table => {
            table.increments('id').primary();
            table.integer('userId')
                .unsigned()
                .references('id')
                .inTable('user')
                .onDelete('cascade');
            table.text('tweet');
            table.integer('totalRetweets');
            table.integer('retweetId')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('tweets')
                .onDelete('CASCADE');
            table.timestamps(false, true);
        });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('tweets');
};
