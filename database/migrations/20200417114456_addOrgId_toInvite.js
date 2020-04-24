exports.up = function (knex) {
    return knex.schema.alterTable("team_invite_link", (tbl) => {
      tbl
        .integer("organization_id")
        .unsigned()
        // .notNullable()
        // .defaultTo(1)
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("team_invite_link", (tbl) => {
      tbl.dropColumn("organization_id");
    });
  };