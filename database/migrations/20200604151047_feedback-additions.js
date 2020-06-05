const rand = () => Math.floor(Math.random() * 5) + 1;

exports.up = function(knex) {
	return knex.schema.hasColumn("feedback", "visual_environment")
		.then(flag => {
			return !flag && knex.schema.table("feedback", col => {
				col.integer("overall_performance")
					.unsigned()
					.notNullable()
					.defaultTo(rand());
					
				col.integer("delivery_and_presentation")
					.unsigned()
					.notNullable()
					.defaultTo(rand());
					
				col.integer("response_quality")
					.unsigned()
					.notNullable()
					.defaultTo(rand());
					
				col.integer("audio_quality")
					.unsigned()
					.notNullable()
					.defaultTo(rand());
					
				col.integer("visual_environment")
					.unsigned()
					.notNullable()
					.defaultTo(rand());
			})
		})
};

exports.down = function(knex) {
	return knex.schema.hasColumn("feedback", "overall_performance")
		.then(flag => {
			return flag &&	knex.schema.table("feedback", col => {
				col.dropColumn("visual_environment");
				col.dropColumn("audio_quality");
				col.dropColumn("response_quality");
				col.dropColumn("delivery_and_presentation");
				col.dropColumn("overall_performance");
			});
		})
};

/* 

Overall performance
Delivery and presentation
Quality of response: How well did he/she/they respond to the question?
Audio quality: Voice clarity, background noise, etc.
Visual environment: Does the environment look professional? Were there any unprofessional interruptions in the background? Etc.

 */