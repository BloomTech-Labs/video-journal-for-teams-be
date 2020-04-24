
exports.up = function(knex) {
  return knex.schema.alterTable("team_members",(tbl)=> {

    tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('organizations_users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
                .alter();

  })
};

exports.down = function(knex) {

    return knex.schema.table("team_members",(tbl)=> {

        tbl.dropForeign('user_id',['user_id']);
    
      })

      
  
};
