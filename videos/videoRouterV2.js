const express = require("express");
const router = express.Router();
const shortId = require("shortid");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
});

const s3 = new AWS.S3();

var storage = multer.memoryStorage();
var upload1 = multer({ dest: "uploads/" });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `videos/ALPACAVID-${shortId.generate()}.mp4`);
    },
  }),
});

const Videos = require("../videos/videoModel.js");

const {
  validateVideoId,
  validateFeedback,
} = require("../middleware/middleware");

// 1. Fetch all videos
router.get("/", (req, res) => {
  Videos.find()
    .then((videos) => res.status(200).json(videos))
    .catch((err) =>
      res.status(500).json({ message: "Could not get videos.", error: err })
    );
});

// 2. Fetch video by id
router.get("/:id", validateVideoId, (req, res) => {
  const { id } = req.params;

  Videos.findById(id)
    .then((video) => res.status(200).json(video))
    .catch((err) =>
      res.status(500).json({ message: "Could not get video.", error: err })
    );
});

// 3. Fetch feedback by video id
router.get("/:id/feedback", validateVideoId, (req, res) => {
  const { id } = req.params;

  Videos.findFeedbackByVideoId(id)
    .then((feedback) => res.status(200).json(feedback))
    .catch((err) =>
      res.status(500).json({ message: "Could not get feedback.", error: err })
    );
});

// 4. Add video feedback
router.post("/:id/feedback/:user_id", validateVideoId, (req, res) => {
  const { id, user_id } = req.params;

  const feedback = {
    post: req.body.post,
    video_id: +id,
    owner_id: user_id,
  };

  io = req.app.get("io");

  Videos.insertFeedback(feedback)
    .then((feedbackId) => {
      res.status(201).json(feedbackId);
      io.emit("insertedFeedback", feedbackId);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not add feedback.", error: err });
    });
});

// Viewed feeback change boolean from falsee to true

router.put("/:id/feedback", validateVideoId, (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const { organizationId } = req.body;

  Videos.updateViewedFeedbackByVideoId(id, userId, organizationId)
    .then((videos) => {
      res.status(201).json(videos);
    })
    .catch((err) => {
      console.log(err);
    });
});

// upload.array("video", 1),

// 5. Add a new video
router.post("/", upload1.array("video", 1), async (req, res) => {
  let jsonPath = path.join(__dirname, "..", "uploads", req.files[0].filename);
  const correct = String(jsonPath).replace(/\\/g, "/");
  const filepath = `videos/ALPACAVID-${shortId.generate()}.mp4`;
  //convert webm file to mp4
  ffmpeg(`${correct}`)
    .output(`${correct}.mp4`)
    .audioCodec("aac")
    .videoCodec("copy")
    .on("end", function () {
      console.log("conversion ended");
      s3.putObject(
        {
          ACL: "public-read",
          Bucket: process.env.AWS_S3_BUCKET,
          Key: filepath,
          Body: fs.readFileSync(`${correct}.mp4`),
        },
        function (error, response) {
          console.log(error, response);
          fs.unlinkSync(correct);
          fs.unlinkSync(`${correct}.mp4`);
        }
      );
    })
    .on("error", function (err) {
      res.status(500).json({ error: err });
    })
    .run();

  const { title, description, owner_id, prompt_id } = req.body;
  const newVideo = {
    owner_id: owner_id,
    title: title,
    description: description,
    video_url: filepath,
    prompt_id: prompt_id,
  };
  console.log(newVideo);

  Videos.insert(newVideo)
    .then((video) => {
      const io = req.app.get("io");

      res
        .status(201)
        .json({ message: "Video creation successful.", id: video[0] });
      io.emit("videoPosted");
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Could not insert new video.", error: err });
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
    .then((video) =>
      res
        .status(200)
        .json({ message: "Video meta-data edit successful.", video: video })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Could not insert new video.", error: err })
    );
});

module.exports = router;
