exports.up = function (knex) {
    return knex.schema
        .createTable('feedback', tbl => {
            tbl.increments();

            tbl.string('post', 255)

            tbl.integer('video_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('videos')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            tbl.integer('owner_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            tbl.timestamp('created_at')
                .defaultTo(knex.fn.now())
                .notNullable();

            tbl.timestamp('updated_at')
                .defaultTo(knex.fn.now())
                .notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('feedback')
};