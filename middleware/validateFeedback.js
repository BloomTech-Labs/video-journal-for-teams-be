module.exports = function validateFeedback(req, res, next) {
	if (req.body.post) {
		req.feedback = { owner_id: req.user.id, post: req.body.post };
		next();
	} else {
		res.status(400).json({ message: "Please provide a post to be submitted as feedback." });
	}
};
