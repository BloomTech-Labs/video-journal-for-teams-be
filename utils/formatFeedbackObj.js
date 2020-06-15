const formatFeedback = (total, progressOverTime) => {
  const feedback = {
    performance_score:
      total.reduce((a, b) => a + +b.overall_performance, 0) / 3,
    human_response_quality:
      total.reduce((a, b) => a + +b.human_response_quality, 0) / 3,
    human_audio_quality:
      total.reduce((a, b) => a + +b.human_audio_quality, 0) / 3,
    human_visual_environment:
      total.reduce((a, b) => a + +b.human_visual_environment, 0) / 3,
    attitude: total.reduce((a, b) => a + +b.attitude, 0) / 3,
    speaking_speed: total.reduce((a, b) => a + +b.speaking_speed, 0) / 3,
    background_noise: total.reduce((a, b) => a + +b.background_noise, 0) / 3,
    appearance_facial_centering:
      total.reduce((a, b) => a + +b.appearance_facial_centering, 0) / 3,
    score_over_time: progressOverTime,
  };
  return feedback;
};

module.exports = formatFeedback;
