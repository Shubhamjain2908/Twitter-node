exports.up = async (knex, Promise) => {

    try {

        await knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('username');
            table.string('email');
            table.string('verificationCode');
            table.boolean('isVerified').defaultTo(false);
            table.string('password');
            table.timestamps(false, true);
        });

        await knex.schema.createTable('auth_token', table => {
            table.increments('id', 11).primary();
            table.text('token');
            table.integer('userId', 11)
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
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
