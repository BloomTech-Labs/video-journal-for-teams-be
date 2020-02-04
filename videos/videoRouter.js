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
	/* 

	req.body should be an object in this form
	{
		"owner_id": 73,
		"title": "Removal of Drainage Device from Peritoneum, Open Approach",
		"description": "Removal of Drainage Device from Peritoneum, Open Approach",
		"created_at": "2020-01-14 14:32:15",
		"updated_at": "2019-01-24 03:09:02",
		"video_url": "http://dummyimage.com/204x108.jpg/5fa2dd/ffffff",
		"prompt_id": 6
	}

	owner_id and prompt_id must be from the same team
	owner_id DOES NOT need team admin permission
	owner_id MUST be logged in and Authz Token in header

	 */
	
	Videos.insert(req.body)
		.then(video => res.status(201).json({ message: "Video creation successful.", id: video[0] }))
		.catch(err => res.status(500).json({ message: "Could not insert new video.", error: err }))
})

module.exports = router;

function clg(...x) { console.log(...x) }