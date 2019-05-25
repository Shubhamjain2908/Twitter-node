exports.up = async (knex, Promise) => {

    try {
        await knex.schema.createTable('follow', table => {
            table.increments('id').primary();
            table.integer('follower')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('cascade');
            table.integer('followedUser')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('cascade');
            table.timestamps(false, true);
        });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
};

exports.down = knex => {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('auth_token')

};
