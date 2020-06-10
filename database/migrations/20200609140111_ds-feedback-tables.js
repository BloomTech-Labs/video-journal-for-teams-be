
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

			tbl.decimal("overall_performance",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("delivery_and_presentation",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("response_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("audio_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("visual_environment",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("attitude",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("sentiment_visual",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.string("sentiment_visual_details", 500)
				.notNullable()
				.defaultTo("0");
				
			tbl.decimal("sentiment_audio",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.string("sentiment_audio_details", 500)
				.notNullable()
				.defaultTo("0");
				
			tbl.decimal("speaking_confidence",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("speaking_volume",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("speaking_vocabulary",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("speaking_speed",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("speaking_filler_words",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("background_visual_environment",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("background_noise",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("appearance_facial_centering",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("appearance_posture",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("appearance_gesticulation",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);
				
			tbl.decimal("human_overall_performance",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_delivery_and_presentation",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_response_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_audio_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_visual_environment",5,3)
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

			tbl.decimal("overall_performance",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("delivery_and_presentation",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("response_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("audio_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("visual_environment",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("attitude",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("sentiment_visual",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.string("sentiment_visual_details", 500)
				.notNullable()
				.defaultTo("0");

			tbl.decimal("sentiment_audio",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.string("sentiment_audio_details", 500)
				.notNullable()
				.defaultTo("0");

			tbl.decimal("speaking_confidence",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("speaking_volume",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("speaking_vocabulary",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("speaking_speed",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("speaking_filler_words",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("background_visual_environment",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("background_noise",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("appearance_facial_centering",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("appearance_posture",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("appearance_gesticulation",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_overall_performance",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_delivery_and_presentation",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_response_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_audio_quality",5,3)
				.unsigned()
				.notNullable()
				.defaultTo(0);

			tbl.decimal("human_visual_environment",5,3)
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
