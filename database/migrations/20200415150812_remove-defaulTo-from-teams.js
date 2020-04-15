exports.up = function (knex) {
    return knex.schema.alterTable("teams", (tbl) => {
      tbl
        .integer("organization_id")
        .unsigned()
        .notNullable()
        .alter()
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable("teams", (tbl) => {
        tbl
          .integer("organization_id")
          .unsigned()
          .notNullable()
          .defaultTo(1)
          .alter()
      });
  };