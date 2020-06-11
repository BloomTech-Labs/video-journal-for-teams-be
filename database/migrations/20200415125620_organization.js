exports.up = function (knex) {
  return knex.schema
    .createTable("organizations", (tbl) => {
      tbl.increments();

      tbl.string("name").notNullable().unique();
    })
    .createTable("organizations_users", (tbl) => {
      tbl
        .integer("organization_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("organizations")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      // Composite key with user_id and team_id
      tbl.primary(["user_id", "organization_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema

    .dropTableIfExists("organizations_users")
    .dropTableIfExists("organizations");
};
