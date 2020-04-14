
exports.up = function(knex) {
    return knex.schema.alterTable('feedback', tbl=>{
        tbl.boolean('viewed')
            .notNullable().defaultTo(true);
    })
};

exports.down = function(knex) {
    return knex.schema.table('feedback', tbl => {
        tbl.dropColumn('viewed')

    })
            
};
