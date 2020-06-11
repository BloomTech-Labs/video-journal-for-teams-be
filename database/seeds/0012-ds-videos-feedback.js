
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('videos_feedback').del()
	.then(function () {
		// Inserts seed entries
		return knex('videos_feedback').insert([
			{ "id": 1, "video_id": 77, "overall_performance": 3.871, "delivery_and_presentation": 4.135, "response_quality": 2.322, "audio_quality": 3.924, "visual_environment": 2.945, "attitude": 4.442, "sentiment_visual": 4.602, "sentiment_visual_details": [{}], "sentiment_audio": 1.063, "sentiment_audio_details": [{}], "speaking_confidence": 2.297, "speaking_volume": 2.092, "speaking_vocabulary": 3.149, "speaking_speed": 3.565, "speaking_filler_words": 4.094, "background_visual_environment": 3.115, "background_noise": 1.177, "appearance_facial_centering": 1.886, "appearance_posture": 2.29, "appearance_gesticulation": 3.268, "human_overall_performance": 3.15, "human_delivery_and_presentation": 4.932, "human_response_quality": 4.89, "human_audio_quality": 2.342, "human_visual_environment": 2.412 },
			{ "id": 2, "video_id": 93, "overall_performance": 4.605, "delivery_and_presentation": 2.265, "response_quality": 3.228, "audio_quality": 3.746, "visual_environment": 2.465, "attitude": 4.451, "sentiment_visual": 1.488, "sentiment_visual_details": [{}], "sentiment_audio": 4.784, "sentiment_audio_details": [{}], "speaking_confidence": 2.7, "speaking_volume": 2.317, "speaking_vocabulary": 2.598, "speaking_speed": 3.88, "speaking_filler_words": 4.986, "background_visual_environment": 1.533, "background_noise": 3.911, "appearance_facial_centering": 3.759, "appearance_posture": 4.201, "appearance_gesticulation": 2.5, "human_overall_performance": 3.725, "human_delivery_and_presentation": 4.071, "human_response_quality": 4.422, "human_audio_quality": 3.031, "human_visual_environment": 1.521 },
			{ "id": 3, "video_id": 100, "overall_performance": 2.976, "delivery_and_presentation": 4.741, "response_quality": 2.758, "audio_quality": 2.684, "visual_environment": 1.253, "attitude": 4.599, "sentiment_visual": 1.75, "sentiment_visual_details": [{}], "sentiment_audio": 2.712, "sentiment_audio_details": [{}], "speaking_confidence": 2.701, "speaking_volume": 1.75, "speaking_vocabulary": 3.356, "speaking_speed": 3.536, "speaking_filler_words": 1.27, "background_visual_environment": 1.798, "background_noise": 2.269, "appearance_facial_centering": 2.938, "appearance_posture": 2.36, "appearance_gesticulation": 1.775, "human_overall_performance": 3.019, "human_delivery_and_presentation": 1.798, "human_response_quality": 3.447, "human_audio_quality": 2.293, "human_visual_environment": 4.495 },
			{ "id": 4, "video_id": 78, "overall_performance": 3.285, "delivery_and_presentation": 3.976, "response_quality": 2.533, "audio_quality": 2.733, "visual_environment": 4.947, "attitude": 2.299, "sentiment_visual": 1.449, "sentiment_visual_details": [{}], "sentiment_audio": 2.286, "sentiment_audio_details": [{}], "speaking_confidence": 1.762, "speaking_volume": 2.147, "speaking_vocabulary": 3.845, "speaking_speed": 2.491, "speaking_filler_words": 2.02, "background_visual_environment": 2.504, "background_noise": 2.975, "appearance_facial_centering": 3.601, "appearance_posture": 4.951, "appearance_gesticulation": 1.831, "human_overall_performance": 3.644, "human_delivery_and_presentation": 1.072, "human_response_quality": 3.279, "human_audio_quality": 4.816, "human_visual_environment": 4.692 },
			{ "id": 5, "video_id": 3, "overall_performance": 4.142, "delivery_and_presentation": 3.18, "response_quality": 1.53, "audio_quality": 2.408, "visual_environment": 1.604, "attitude": 4.251, "sentiment_visual": 3.799, "sentiment_visual_details": [{}], "sentiment_audio": 1.706, "sentiment_audio_details": [{}], "speaking_confidence": 3.926, "speaking_volume": 2.809, "speaking_vocabulary": 4.825, "speaking_speed": 1.785, "speaking_filler_words": 2.711, "background_visual_environment": 4.105, "background_noise": 2.113, "appearance_facial_centering": 2.566, "appearance_posture": 4.973, "appearance_gesticulation": 1.939, "human_overall_performance": 2.327, "human_delivery_and_presentation": 1.749, "human_response_quality": 3.918, "human_audio_quality": 2.825, "human_visual_environment": 2.351 },
			{ "id": 6, "video_id": 49, "overall_performance": 2.611, "delivery_and_presentation": 1.856, "response_quality": 3.334, "audio_quality": 1.764, "visual_environment": 4.778, "attitude": 1.515, "sentiment_visual": 2.832, "sentiment_visual_details": [{}], "sentiment_audio": 2.261, "sentiment_audio_details": [{}], "speaking_confidence": 4.68, "speaking_volume": 1.119, "speaking_vocabulary": 2.717, "speaking_speed": 3.908, "speaking_filler_words": 2.581, "background_visual_environment": 1.241, "background_noise": 3.796, "appearance_facial_centering": 2.456, "appearance_posture": 3.442, "appearance_gesticulation": 2.745, "human_overall_performance": 3.627, "human_delivery_and_presentation": 3.153, "human_response_quality": 1.222, "human_audio_quality": 1.191, "human_visual_environment": 4.702 },
			{ "id": 7, "video_id": 44, "overall_performance": 2.831, "delivery_and_presentation": 1.269, "response_quality": 3.647, "audio_quality": 4.866, "visual_environment": 1.9, "attitude": 4.226, "sentiment_visual": 1.38, "sentiment_visual_details": [{}], "sentiment_audio": 2.697, "sentiment_audio_details": [{}], "speaking_confidence": 3.89, "speaking_volume": 2.259, "speaking_vocabulary": 4.988, "speaking_speed": 4.888, "speaking_filler_words": 3.241, "background_visual_environment": 2.031, "background_noise": 4.293, "appearance_facial_centering": 4.127, "appearance_posture": 3.504, "appearance_gesticulation": 4.951, "human_overall_performance": 4.574, "human_delivery_and_presentation": 4.161, "human_response_quality": 2.304, "human_audio_quality": 2.248, "human_visual_environment": 1.24 },
			{ "id": 8, "video_id": 21, "overall_performance": 3.732, "delivery_and_presentation": 2.218, "response_quality": 2.02, "audio_quality": 4.45, "visual_environment": 2.283, "attitude": 2.948, "sentiment_visual": 2.949, "sentiment_visual_details": [{}], "sentiment_audio": 2.126, "sentiment_audio_details": [{}], "speaking_confidence": 1.245, "speaking_volume": 3.431, "speaking_vocabulary": 4.865, "speaking_speed": 3.853, "speaking_filler_words": 4.73, "background_visual_environment": 2.389, "background_noise": 4.385, "appearance_facial_centering": 3.989, "appearance_posture": 1.467, "appearance_gesticulation": 1.991, "human_overall_performance": 2.781, "human_delivery_and_presentation": 1.617, "human_response_quality": 3.415, "human_audio_quality": 3.625, "human_visual_environment": 2.016 },
			{ "id": 9, "video_id": 53, "overall_performance": 2.691, "delivery_and_presentation": 1.189, "response_quality": 4.09, "audio_quality": 1.656, "visual_environment": 1.207, "attitude": 3.173, "sentiment_visual": 1.112, "sentiment_visual_details": [{}], "sentiment_audio": 2.523, "sentiment_audio_details": [{}], "speaking_confidence": 4.604, "speaking_volume": 1.446, "speaking_vocabulary": 2.518, "speaking_speed": 1.546, "speaking_filler_words": 2.162, "background_visual_environment": 4.227, "background_noise": 3.831, "appearance_facial_centering": 1.04, "appearance_posture": 3.817, "appearance_gesticulation": 4.346, "human_overall_performance": 1.745, "human_delivery_and_presentation": 4.976, "human_response_quality": 3.423, "human_audio_quality": 1.358, "human_visual_environment": 1.443 },
			{ "id": 10, "video_id": 76, "overall_performance": 2.723, "delivery_and_presentation": 2.15, "response_quality": 4.948, "audio_quality": 4.603, "visual_environment": 4.856, "attitude": 4.826, "sentiment_visual": 4.76, "sentiment_visual_details": [{}], "sentiment_audio": 3.772, "sentiment_audio_details": [{}], "speaking_confidence": 4.682, "speaking_volume": 3.85, "speaking_vocabulary": 2.838, "speaking_speed": 4.241, "speaking_filler_words": 3.492, "background_visual_environment": 2.932, "background_noise": 4.413, "appearance_facial_centering": 3.011, "appearance_posture": 4.051, "appearance_gesticulation": 2.644, "human_overall_performance": 2.356, "human_delivery_and_presentation": 4.545, "human_response_quality": 2.352, "human_audio_quality": 1.236, "human_visual_environment": 2.14 },
			{ "id": 11, "video_id": 65, "overall_performance": 1.282, "delivery_and_presentation": 1.46, "response_quality": 4.495, "audio_quality": 4.881, "visual_environment": 2.735, "attitude": 4.51, "sentiment_visual": 1.421, "sentiment_visual_details": [{}], "sentiment_audio": 3.837, "sentiment_audio_details": [{}], "speaking_confidence": 4.351, "speaking_volume": 1.839, "speaking_vocabulary": 2.659, "speaking_speed": 3.119, "speaking_filler_words": 2.447, "background_visual_environment": 3.482, "background_noise": 1.046, "appearance_facial_centering": 4.698, "appearance_posture": 1.223, "appearance_gesticulation": 4.735, "human_overall_performance": 1.252, "human_delivery_and_presentation": 2.557, "human_response_quality": 3.395, "human_audio_quality": 1.791, "human_visual_environment": 2.825 },
			{ "id": 12, "video_id": 5, "overall_performance": 4.769, "delivery_and_presentation": 2.725, "response_quality": 4.115, "audio_quality": 1.333, "visual_environment": 4.136, "attitude": 2.349, "sentiment_visual": 1.105, "sentiment_visual_details": [{}], "sentiment_audio": 4.519, "sentiment_audio_details": [{}], "speaking_confidence": 1.877, "speaking_volume": 2.97, "speaking_vocabulary": 2.367, "speaking_speed": 1.953, "speaking_filler_words": 3.632, "background_visual_environment": 2.95, "background_noise": 3.446, "appearance_facial_centering": 2.633, "appearance_posture": 4.82, "appearance_gesticulation": 3.373, "human_overall_performance": 4.512, "human_delivery_and_presentation": 4.554, "human_response_quality": 3.469, "human_audio_quality": 4.868, "human_visual_environment": 2.406 },
			{ "id": 13, "video_id": 97, "overall_performance": 2.119, "delivery_and_presentation": 2.131, "response_quality": 3.831, "audio_quality": 2.738, "visual_environment": 3.275, "attitude": 2.161, "sentiment_visual": 4.351, "sentiment_visual_details": [{}], "sentiment_audio": 1.06, "sentiment_audio_details": [{}], "speaking_confidence": 3.249, "speaking_volume": 3.347, "speaking_vocabulary": 3.032, "speaking_speed": 4.618, "speaking_filler_words": 4.508, "background_visual_environment": 3.217, "background_noise": 2.524, "appearance_facial_centering": 4.072, "appearance_posture": 1.234, "appearance_gesticulation": 2.122, "human_overall_performance": 4.282, "human_delivery_and_presentation": 4.51, "human_response_quality": 3.271, "human_audio_quality": 1.405, "human_visual_environment": 3.126 },
			{ "id": 14, "video_id": 96, "overall_performance": 3.67, "delivery_and_presentation": 2.382, "response_quality": 2.904, "audio_quality": 4.149, "visual_environment": 4.461, "attitude": 1.44, "sentiment_visual": 4.265, "sentiment_visual_details": [{}], "sentiment_audio": 2.044, "sentiment_audio_details": [{}], "speaking_confidence": 3.449, "speaking_volume": 2.508, "speaking_vocabulary": 1.899, "speaking_speed": 4.196, "speaking_filler_words": 1.175, "background_visual_environment": 3.91, "background_noise": 3.897, "appearance_facial_centering": 2.336, "appearance_posture": 4.041, "appearance_gesticulation": 4.365, "human_overall_performance": 2.309, "human_delivery_and_presentation": 4.992, "human_response_quality": 3.485, "human_audio_quality": 2.172, "human_visual_environment": 3.413 },
			{ "id": 15, "video_id": 46, "overall_performance": 1.371, "delivery_and_presentation": 2.283, "response_quality": 4.229, "audio_quality": 4.296, "visual_environment": 3.389, "attitude": 4.202, "sentiment_visual": 2.746, "sentiment_visual_details": [{}], "sentiment_audio": 4.622, "sentiment_audio_details": [{}], "speaking_confidence": 1.885, "speaking_volume": 2.055, "speaking_vocabulary": 1.912, "speaking_speed": 3.245, "speaking_filler_words": 4.62, "background_visual_environment": 4.067, "background_noise": 2.823, "appearance_facial_centering": 4.611, "appearance_posture": 4.288, "appearance_gesticulation": 4.384, "human_overall_performance": 2.93, "human_delivery_and_presentation": 3.935, "human_response_quality": 1.751, "human_audio_quality": 1.013, "human_visual_environment": 1.317 },
			{ "id": 16, "video_id": 88, "overall_performance": 1.549, "delivery_and_presentation": 4.55, "response_quality": 2.272, "audio_quality": 1.692, "visual_environment": 3.858, "attitude": 4.397, "sentiment_visual": 3.917, "sentiment_visual_details": [{}], "sentiment_audio": 4.182, "sentiment_audio_details": [{}], "speaking_confidence": 4.042, "speaking_volume": 1.031, "speaking_vocabulary": 1.225, "speaking_speed": 4.634, "speaking_filler_words": 2.72, "background_visual_environment": 2.429, "background_noise": 3.537, "appearance_facial_centering": 3.771, "appearance_posture": 4.528, "appearance_gesticulation": 4.748, "human_overall_performance": 4.405, "human_delivery_and_presentation": 1.682, "human_response_quality": 3.899, "human_audio_quality": 4.629, "human_visual_environment": 1.557 },
			{ "id": 17, "video_id": 46, "overall_performance": 1.472, "delivery_and_presentation": 4.154, "response_quality": 3.064, "audio_quality": 4.357, "visual_environment": 2.842, "attitude": 3.872, "sentiment_visual": 3.872, "sentiment_visual_details": [{}], "sentiment_audio": 3.985, "sentiment_audio_details": [{}], "speaking_confidence": 1.727, "speaking_volume": 4.566, "speaking_vocabulary": 3.625, "speaking_speed": 3.126, "speaking_filler_words": 4.074, "background_visual_environment": 1.22, "background_noise": 4.119, "appearance_facial_centering": 4.994, "appearance_posture": 4.686, "appearance_gesticulation": 2.094, "human_overall_performance": 4.725, "human_delivery_and_presentation": 2.954, "human_response_quality": 2.287, "human_audio_quality": 4.116, "human_visual_environment": 1.074 },
			{ "id": 18, "video_id": 51, "overall_performance": 2.341, "delivery_and_presentation": 3.337, "response_quality": 4.978, "audio_quality": 4.915, "visual_environment": 2.722, "attitude": 1.695, "sentiment_visual": 3.111, "sentiment_visual_details": [{}], "sentiment_audio": 1.031, "sentiment_audio_details": [{}], "speaking_confidence": 2.473, "speaking_volume": 3.167, "speaking_vocabulary": 1.923, "speaking_speed": 1.067, "speaking_filler_words": 3.648, "background_visual_environment": 4.183, "background_noise": 2.233, "appearance_facial_centering": 2.692, "appearance_posture": 4.45, "appearance_gesticulation": 1.435, "human_overall_performance": 1.79, "human_delivery_and_presentation": 4.961, "human_response_quality": 2.785, "human_audio_quality": 1.82, "human_visual_environment": 1.359 },
			{ "id": 19, "video_id": 88, "overall_performance": 2.455, "delivery_and_presentation": 2.385, "response_quality": 1.757, "audio_quality": 3.145, "visual_environment": 3.595, "attitude": 3.826, "sentiment_visual": 2.33, "sentiment_visual_details": [{}], "sentiment_audio": 4.695, "sentiment_audio_details": [{}], "speaking_confidence": 3.087, "speaking_volume": 4.733, "speaking_vocabulary": 3.421, "speaking_speed": 1.857, "speaking_filler_words": 2.447, "background_visual_environment": 3.665, "background_noise": 3.836, "appearance_facial_centering": 3.619, "appearance_posture": 4.44, "appearance_gesticulation": 3.292, "human_overall_performance": 1.904, "human_delivery_and_presentation": 2.756, "human_response_quality": 2.283, "human_audio_quality": 4.521, "human_visual_environment": 3.446 },
			{ "id": 20, "video_id": 33, "overall_performance": 4.631, "delivery_and_presentation": 4.627, "response_quality": 2.586, "audio_quality": 1.122, "visual_environment": 4.941, "attitude": 2.627, "sentiment_visual": 1.672, "sentiment_visual_details": [{}], "sentiment_audio": 1.689, "sentiment_audio_details": [{}], "speaking_confidence": 2.088, "speaking_volume": 1.014, "speaking_vocabulary": 2.148, "speaking_speed": 4.993, "speaking_filler_words": 4.292, "background_visual_environment": 3.979, "background_noise": 4.338, "appearance_facial_centering": 4.673, "appearance_posture": 2.742, "appearance_gesticulation": 1.084, "human_overall_performance": 3.898, "human_delivery_and_presentation": 2.374, "human_response_quality": 3.734, "human_audio_quality": 1.062, "human_visual_environment": 2.763 },
			{ "id": 21, "video_id": 49, "overall_performance": 4.768, "delivery_and_presentation": 3.943, "response_quality": 3.901, "audio_quality": 3.717, "visual_environment": 4.468, "attitude": 3.56, "sentiment_visual": 3.886, "sentiment_visual_details": [{}], "sentiment_audio": 3.728, "sentiment_audio_details": [{}], "speaking_confidence": 3.261, "speaking_volume": 1.993, "speaking_vocabulary": 4.036, "speaking_speed": 4.66, "speaking_filler_words": 4.207, "background_visual_environment": 1.46, "background_noise": 3.851, "appearance_facial_centering": 4.791, "appearance_posture": 4.508, "appearance_gesticulation": 1.796, "human_overall_performance": 4.768, "human_delivery_and_presentation": 4.405, "human_response_quality": 4.461, "human_audio_quality": 3.696, "human_visual_environment": 4.866 },
			{ "id": 22, "video_id": 64, "overall_performance": 3.716, "delivery_and_presentation": 1.791, "response_quality": 4.716, "audio_quality": 4.07, "visual_environment": 2.834, "attitude": 2.573, "sentiment_visual": 4.537, "sentiment_visual_details": [{}], "sentiment_audio": 3.202, "sentiment_audio_details": [{}], "speaking_confidence": 1.277, "speaking_volume": 1.064, "speaking_vocabulary": 4.598, "speaking_speed": 4.991, "speaking_filler_words": 1.334, "background_visual_environment": 1.789, "background_noise": 1.938, "appearance_facial_centering": 2.855, "appearance_posture": 3.183, "appearance_gesticulation": 2.742, "human_overall_performance": 2.646, "human_delivery_and_presentation": 1.936, "human_response_quality": 2.003, "human_audio_quality": 3.286, "human_visual_environment": 1.56 },
			{ "id": 23, "video_id": 4, "overall_performance": 1.475, "delivery_and_presentation": 1.613, "response_quality": 4.776, "audio_quality": 3.549, "visual_environment": 1.199, "attitude": 1.089, "sentiment_visual": 4.099, "sentiment_visual_details": [{}], "sentiment_audio": 2.048, "sentiment_audio_details": [{}], "speaking_confidence": 1.963, "speaking_volume": 2.308, "speaking_vocabulary": 3.83, "speaking_speed": 2.672, "speaking_filler_words": 1.901, "background_visual_environment": 2.9, "background_noise": 4.841, "appearance_facial_centering": 3.845, "appearance_posture": 4.321, "appearance_gesticulation": 2.271, "human_overall_performance": 2.542, "human_delivery_and_presentation": 3.023, "human_response_quality": 4.916, "human_audio_quality": 2.259, "human_visual_environment": 3.367 },
			{ "id": 24, "video_id": 59, "overall_performance": 4.824, "delivery_and_presentation": 3.437, "response_quality": 3.606, "audio_quality": 3.868, "visual_environment": 1.818, "attitude": 1.219, "sentiment_visual": 1.541, "sentiment_visual_details": [{}], "sentiment_audio": 1.673, "sentiment_audio_details": [{}], "speaking_confidence": 2.512, "speaking_volume": 2.776, "speaking_vocabulary": 4.531, "speaking_speed": 4.458, "speaking_filler_words": 3.542, "background_visual_environment": 3.357, "background_noise": 2.844, "appearance_facial_centering": 4.904, "appearance_posture": 3.372, "appearance_gesticulation": 1.733, "human_overall_performance": 2.049, "human_delivery_and_presentation": 3.588, "human_response_quality": 2.202, "human_audio_quality": 4.915, "human_visual_environment": 3.538 },
			{ "id": 25, "video_id": 82, "overall_performance": 1.425, "delivery_and_presentation": 4.337, "response_quality": 3.077, "audio_quality": 4.48, "visual_environment": 4.109, "attitude": 4.746, "sentiment_visual": 3.222, "sentiment_visual_details": [{}], "sentiment_audio": 2.519, "sentiment_audio_details": [{}], "speaking_confidence": 3.874, "speaking_volume": 2.034, "speaking_vocabulary": 3.9, "speaking_speed": 3.161, "speaking_filler_words": 3.351, "background_visual_environment": 3.148, "background_noise": 3.405, "appearance_facial_centering": 3.493, "appearance_posture": 1.413, "appearance_gesticulation": 2.098, "human_overall_performance": 1.892, "human_delivery_and_presentation": 1.761, "human_response_quality": 3.645, "human_audio_quality": 1.687, "human_visual_environment": 1.404 }
		]);
	});
};
