const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js");
const Videos = require("../videos/videoModel.js");
const Organizations = require("../organization/organizationModel.js");
const validateUserId = require("../middleware/validateUserId");
const router = express.Router();

const shortId = require("shortid");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
});

//s3 connection
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read",
    key: function (req, file, cb) {
      const extension = file.mimetype.replace(/image\//g, "");
      cb(null, `photos/ALPACAPIC-${shortId.generate()}.${extension}`);
    },
  }),
});

const VidFeedback = require("./videoFeedbackModel.js");

// INSERT` a new Videos Feedback
router.post("/feedback", (req, res) => {
  const extfbk = req.body;
  VidFeedback.insertVideosFeedback(extfbk)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Could not add Videos Feedback.", error: err });
    });
});

// GET ALL existing Videos Feedback by `video_id`
router.get("/feedback/:id", (req, res) => {
  const { id } = req.params;
  VidFeedback.getOverallPerformance(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//select all users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
});

//find by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

//get organizations that user belongs to
router.get("/:id/organizations", (req, res) => {
  const { id } = req.params;
  Organizations.getOrganzationsByUser(id)
    .then((orgs) => res.status(200).json(orgs))
    .catch((err) => res.status(500).json({ error: err }));
});

//get teams that a user belongs to in organization
router.get("/:id/teams/:org_id", (req, res) => {
  const { id, org_id } = req.params;

  Teams.findByUserId(id, org_id)
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(500).json({ error: err }));
});

//get all user's videos in org
router.get("/:id/videos/:org_id", (req, res) => {
  const { id, org_id } = req.params;

  Videos.findByUserId(id, org_id)
    .then((vids) => res.status(200).json(vids))
    .catch((err) => res.status(500).json({ error: err }));
});

//update user's profile info
router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then((updated) =>
      res
        .status(200)
        .json({ message: `successfully updated user with ${id}`, updated })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//update user avatar
router.post("/:id/photo", upload.array("photo", 1), (req, res) => {
  const { id } = req.params;

  const newPhoto = {
    avatar: req.files[0].key,
  };

  Users.update(id, newPhoto)
    .then((updated) => res.status(201).json({ avatar: updated }))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET single video feedback for a user
router.get("/singlevid/:id", (req, res) => {
  const { id } = req.params;
  Users.getSingleVideoFeedback(id)
    .then(([video]) => res.status(200).json({ video }))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
