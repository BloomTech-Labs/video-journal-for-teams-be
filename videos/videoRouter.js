const express = require('express');

const Videos = require('../videos/videoModel.js');

const router = express.Router();

const { validateVideoId } = require("../middleware/middleware");

router.get("/", (req, res) => {
	Videos.find()
		.then(videos => res.status(200).json(videos))
		.catch(err => res.status(500).json({ message: "Could not get videos.", error: err }));
});

router.get('/:id', validateVideoId, (req, res) => {
	const { id } = req.params

	Videos.findById(id)
		.then(video => res.status(200).json(video))
		.catch(err => res.status(500).json({ message: "Could not get video.", error: err }))
});

router.post("/", (req, res) => {
	const { id } = req.params

	Videos.insert(id)
		.then(video => res.status(201).json({ message: "Video creation successful.", id: video }))
		.catch(err => res.status(500).json({ message: "Could not insert new video.", error: err }))
})

module.exports = router;
