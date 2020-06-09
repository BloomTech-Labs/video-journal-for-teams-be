
exports.up = function(knex) {
	return knex.schema
		.createTable("videos_feedback", tbl =>  {
			tbl.increments();

			tbl.integer("video_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("videos")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");

			tbl.integer("overall_performance")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("delivery_and_presentation")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("response_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("audio_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("visual_environment")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("attitude")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("sentiment_visual")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.string("sentiment_visual_details", 500)
				.notNullable()
				.defaultTo("0");
				
			tbl.integer("sentiment_audio")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.string("sentiment_audio_details", 500)
				.notNullable()
				.defaultTo("0");
				
			tbl.integer("speaking_confidence")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("speaking_volume")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("speaking_vocabulary")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("speaking_speed")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("speaking_filler_words")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("background_visual_environment")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("background_noise")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("appearance_facial_centering")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("appearance_posture")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("appearance_gesticulation")
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.integer("human_overall_performance")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_delivery_and_presentation")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_response_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_audio_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_visual_environment")
				.unsigned()
				.notNullable()
				.defaultTo(0);
		})

		.createTable("users_feedback", tbl => {
			tbl.increments();

			tbl.integer("user_id")
				.unsigned()
				.notNullable()
				.references("id")
				.inTable("users")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");

			tbl.integer("overall_performance")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("delivery_and_presentation")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("response_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("audio_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("visual_environment")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("attitude")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("sentiment_visual")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.string("sentiment_visual_details", 500)
				.notNullable()
				.defaultTo("0");

			tbl.integer("sentiment_audio")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.string("sentiment_audio_details", 500)
				.notNullable()
				.defaultTo("0");

			tbl.integer("speaking_confidence")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("speaking_volume")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("speaking_vocabulary")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("speaking_speed")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("speaking_filler_words")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("background_visual_environment")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("background_noise")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("appearance_facial_centering")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("appearance_posture")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("appearance_gesticulation")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_overall_performance")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_delivery_and_presentation")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_response_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_audio_quality")
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.integer("human_visual_environment")
				.unsigned()
				.notNullable()
				.defaultTo(0);

		})

  
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("users_feedback")
		.dropTableIfExists("videos_feedback")
};
