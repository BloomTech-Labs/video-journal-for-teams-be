exports.up = function (knex) {
  return knex.schema.alterTable("teams", (tbl) => {
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
  return knex.schema.table("teams", (tbl) => {
    tbl.dropColumn("organization_id");
  });
};
