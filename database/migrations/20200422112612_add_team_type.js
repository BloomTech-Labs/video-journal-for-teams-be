
exports.up = function(knex) {
    return knex.schema.alterTable("teams", (tbl) => {
        tbl
          .enu('team_type', ['public', 'private'])
         
      });
};

exports.down = function(knex) {
    return knex.schema.table("teams", (tbl) => {
        tbl.dropColumn("team_type");
      });
};
