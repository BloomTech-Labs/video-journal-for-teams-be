const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js");
const Videos = require("../videos/videoModel.js");
const Organizations = require("../organization/organizationModel.js");
const VidFeedback = require("../users/videoFeedbackModel");
const router = express.Router();

const shortId = require("shortid");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
});

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

const { validateUserId, verifyPassword } = require("../middleware/middleware");

// 1. Fetch all users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(500).json({ message: "Could not get all users.", error: err })
    );
});

// 2. Fetch user by id
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.validatedUser);
});

// 3. Fetch a user's teams
router.get("/:id/teams/:organization_id", validateUserId, (req, res) => {
  const { id, organization_id } = req.params;

  Teams.findByUserId(id, organization_id)
    .then((teams) => res.status(200).json(teams))
    .catch((err) =>
      res
        .status(500)
        .json({ message: `Could not get teams for user ${id}.`, error: err })
    );
});

// 4. Fetch at user's videos
router.get("/:id/videos/:organization_id", validateUserId, (req, res) => {
  const { id, organization_id } = req.params;
  Videos.findByUserId(id, organization_id)
    .then((videos) => {
      res.status(200).json(videos);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: `Could not get videos for user ${id}.`, error: err })
    );
});

// router.get("/:id/videos", validateUserId, (req, res) => {
// 	const { id } = req.params;

// 	Videos.findByUserId(id)
// 		.then((videos) => res.status(200).json(videos))
// 		.catch((err) => res.status(500).json({ message: `Could not get videos for user ${id}.`, error: err }));
// });

// 5. Update a user's info
router.put("/:id", validateUserId, verifyPassword, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  //This logic only applies if the user is trying to update their password.
  //It utilizes verifyPassword middleware.
  if (req.body.password) {
    Users.update(id, { password: req.body.password })
      .then((updatedUser) =>
        res.status(200).json({
          message: `Successfully updated password for user ${id}.`,
          updatedUser,
        })
      )
      .catch((err) =>
        res
          .status(500)
          .json({ message: `Could not get user ${id}.`, error: err })
      );
  } else {
    //All other cases for updating a user's information.
    Users.update(id, changes)
      .then((updatedUser) =>
        res
          .status(200)
          .json({ message: `Successfully updated user ${id}.`, updatedUser })
      )
      .catch((err) =>
        res
          .status(500)
          .json({ message: `Could not get user ${id}.`, error: err })
      );
  }
});
//add avatar
router.post("/:id/photo", upload.array("photo", 1), (req, res) => {
  const { id } = req.params;

  const newPhoto = {
    avatar: req.files[0].key,
  };

  Users.update(id, newPhoto)
    .then((user) => {
      res
        .status(201)
        .json({ message: "Photo uploaded successfully.", avatar: user.avatar });
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not upload photo.", error: err });
    });
});

//GET user organizations
router.get("/:id/organizations", validateUserId, (req, res) => {
  const { id } = req.params;

  Organizations.getOrganzationsByUser(id)
    .then((organizations) => res.status(200).json(organizations))
    .catch((err) =>
      res.status(500).json({
        message: `Could not get organizations for user ${id}.`,
        error: err,
      })
    );
});

//GET video feedback scores by userId
router.get("/feedback/:id", (req, res) => {
  const { id } = req.params;
  VidFeedback.getOverallPerformance(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//GET all of a users teams by userId
router.get("/teams/:id", (req, res) => {
  const { id } = req.params;
  VidFeedback.getUserTeams(id)
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET all of a users prompts by userId
router.get("/prompts/:id", (req, res) => {
  const { id } = req.params;
  return VidFeedback.getUserPrompts(id)
    .then((prompts) => res.status(200).json(prompts))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET all of a users videos by userId
router.get("/videos/:id", (req, res) => {
  const { id } = req.params;
  return VidFeedback.getUserVideos(id)
    .then((videos) => res.status(200).json(videos))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
