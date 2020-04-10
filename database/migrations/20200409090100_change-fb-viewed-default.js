
exports.up = function(knex) {
    return knex.schema.alterTable('feedback', tbl=>{
        tbl.boolean('viewed')
            .notNullable().defaultTo(false).alter();
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('feedback', tbl=>{
        tbl.boolean('viewed')
            .notNullable().defaultTo(true).alter();
    })
};
