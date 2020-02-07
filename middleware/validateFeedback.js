module.exports = function validateFeedback(req, res, next) {
  const { owner_id, post } = req.body;

  if (owner_id) {
    if (post) {
      req.feedback = { owner_id, post };
      next();
    } else {
      res.status(400).json({ message: "Please provide a post to be submitted as feedback." });
    }
  } else {
    res.status(403).json({ message: "Only logged in users can submit feedback." });
  }
};
