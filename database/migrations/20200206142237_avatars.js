//* Add an avatar column to users/teams
//* Add a new table to hold references to predefiend generic avatars
exports.up = function(knex) {
  return knex.schema
    .table("users", (tbl) => {
      tbl.string("avatar");
    })
    .table("teams", (tbl) => {
      tbl.string("avatar");
    })
    .createTable("avatars", (tbl) => {
      tbl.increments();

      tbl.string("src").notNullable();
    });
};

//* Revert changes added by migration on rollback
exports.down = function(knex) {
  return knex.schema
    .table("users", (tbl) => {
      tbl.dropColumn("avatar");
    })
    .table("teams", (tbl) => {
      tbl.dropColumn("avatar");
    })
    .dropTableIfExists("avatars");
};
