const express = require("express");
const router = express.Router();
const shortId = require("shortid");
const multer = require("multer");
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS
});

const s3 = new AWS.S3();

const upload = multer({
	storage: multerS3({
			s3: s3,
			bucket: process.env.AWS_S3_BUCKET,
			acl: 'public-read',
			key: function (req, file, cb) {
					cb(null, `videos/ALPACAVID-${shortId.generate()}.webm`);
			}
	})
});

const Videos = require("../videos/videoModel.js");

const { validateVideoId, validateFeedback } = require("../middleware/middleware");

// 1. Fetch all videos
router.get("/", (req, res) => {
	Videos.find()
		.then((videos) => res.status(200).json(videos))
		.catch((err) => res.status(500).json({ message: "Could not get videos.", error: err }));
});

// 2. Fetch video by id
router.get("/:id", validateVideoId, (req, res) => {
	const { id } = req.params;

	Videos.findById(id)
		.then((video) => res.status(200).json(video))
		.catch((err) => res.status(500).json({ message: "Could not get video.", error: err }));
});

// 3. Fetch feedback by video id
router.get("/:id/feedback", validateVideoId, (req, res) => {
	const { id } = req.params;

	Videos.findFeedbackByVideoId(id)
		.then((feedback) => res.status(200).json(feedback))
		.catch((err) => res.status(500).json({ message: "Could not get feedback.", error: err }));
});

// 4. Add video feedback
router.post("/:id/feedback", validateVideoId, validateFeedback, (req, res) => {
	const { id } = req.params;
	req.feedback.video_id = Number(id);

	Videos.insertFeedback(req.feedback)
		.then((feedbackId) => {
			res.status(201).json(feedbackId);
		})
		.catch((err) => {
			res.status(500).json({ message: "Could not add feedback.", error: err });
		});
});

// 5. Add a new video
router.post("/", upload.array('video',1), (req, res) => {
	const { title, description, owner_id, prompt_id } = req.body;

	const newVideo = {
		owner_id: owner_id,
		title: title,
		description: description,
		video_url: req.files[0].key,
		prompt_id: prompt_id,
	};

	Videos.insert(newVideo)
		.then((video) => res.status(201).json({ message: "Video creation successful.", id: video[0] }))
		.catch((err) => {
			res.status(500).json({ message: "Could not insert new video.", error: err });
		});
});

// 6. Update a video
router.put("/", (req, res) => {
	/* 

	req.body should be an object in the same form as router.POST

	REQUIREMENTS:
		* The JSON object MUST contain video.id 
		* Same as router.post

	*/
	Videos.update(req.body)
		.then((video) => res.status(200).json({ message: "Video meta-data edit successful.", video: video }))
		.catch((err) => res.status(500).json({ message: "Could not insert new video.", error: err }));
});

module.exports = router;
