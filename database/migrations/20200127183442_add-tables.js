
exports.up = function (knex) {
    return knex.schema.createTable('roles', tbl => { // Roles table
        tbl.increments();

        tbl.string('name', 128)
            .notNullable();
    })
        .createTable('users', tbl => { // Users table
            tbl.increments();

            tbl.string('email', 128)
                .unique()
                .notNullable();

            tbl.string('username', 128)
                .unique()
                .notNullable();

            tbl.string('password', 128)
                .notNullable();
        })
        .createTable('teams', tbl => { // Teams table
            tbl.increments();

            tbl.string('name', 128)
                .notNullable();

            tbl.string('description')
                .notNullable();

            tbl.timestamp('created_at')
                .defaultTo(knex.fn.now())
                .notNullable();

            tbl.timestamp('updated_at')
                .defaultTo(knex.fn.now())
                .notNullable();
        })
        .createTable('team_members', tbl => { // Team member table
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            tbl.integer('team_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('teams')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            tbl.integer('role_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('roles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            // Composite key with user_id and team_id
            tbl.primary(['user_id', 'team_id'])
        });
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('team_members')
        .dropTableIfExists('teams')
        .dropTableIfExists('users')
        .dropTableIfExists('roles')
};
