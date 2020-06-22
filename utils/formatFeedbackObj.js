const formatFeedback = (total, progressOverTime) => {
  const feedback = {
    performance_score:
      total.reduce((a, b) => a + +b.overall_performance, 0) / total.length,
    human_response_quality:
      total.reduce((a, b) => a + +b.human_response_quality, 0) / total.length,
    human_audio_quality:
      total.reduce((a, b) => a + +b.human_audio_quality, 0) / total.length,
    human_visual_environment:
      total.reduce((a, b) => a + +b.human_visual_environment, 0) / total.length,
    attitude: total.reduce((a, b) => a + +b.attitude, 0) / total.length,
    speaking_speed:
      total.reduce((a, b) => a + +b.speaking_speed, 0) / total.length,
    background_noise:
      total.reduce((a, b) => a + +b.background_noise, 0) / total.length,
    appearance_facial_centering:
      total.reduce((a, b) => a + +b.appearance_facial_centering, 0) /
      total.length,
    score_over_time: progressOverTime,
  };
  return feedback;
};

module.exports = formatFeedback;
