const express = require("express");
const router = express.Router();
const shortId = require("shortid");
const multer = require("multer");
const path = require("path");

const Videos = require("../videos/videoModel.js");

const { validateVideoId, validateFeedback } = require("../middleware/middleware");

const videoDir = path.join(__dirname, "../public/videos");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, videoDir);
	},
	filename: (req, file, cb) => {
		cb(null, `ALPACAVID-${shortId.generate()}.webm`);
	},
});

const upload = multer({ storage: storage });

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
router.post("/", upload.single("video"), (req, res) => {
	const { title, description, owner_id, prompt_id } = req.body;

	const newVideo = {
		owner_id: owner_id,
		title: title,
		description: description,
		video_url: req.file.filename,
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
