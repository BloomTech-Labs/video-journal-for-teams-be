
exports.up = function (knex) {

	// Before the migration will run your videos table needs to be cleared.

	return knex.schema
		.table("videos", tbl => {
			tbl.string('thumbnail', 255)
		})
};

exports.down = function (knex) {
	return knex.schema.table("videos", (tbl) => 
	tbl.dropColumn("thumbnail")
	)
};


