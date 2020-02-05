exports.up = function (knex) {
	return knex.schema
		.createTable("team_invite_link", tbl => {
			tbl.increments();

			tbl.integer("team_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("teams")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");

			tbl.string("link", 255)
				.notNullable();

			tbl.boolean("isValid")
				.notNullable();

			tbl.timestamp("created_at")
				.defaultTo(knex.fn.now())
				.notNullable();
			tbl.timestamp("expires_at")
				.defaultTo(knex.fn.now())
				.notNullable();

		})

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("team_invite_link")
};
