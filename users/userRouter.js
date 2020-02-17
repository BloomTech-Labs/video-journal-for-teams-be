const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js");
const Videos = require("../videos/videoModel.js");
const router = express.Router();

const { validateUserId } = require("../middleware/middleware");

// 1. Fetch all users
router.get("/", (req, res) => {
	Users.find()
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).json({ message: "Could not get all users.", error: err }));
});

// 2. Fetch user by id
router.get("/:id", validateUserId, (req, res) => {
	res.status(200).json(req.validatedUser);
});

// 3. Fetch a user's teams
router.get("/:id/teams", validateUserId, (req, res) => {
	const { id } = req.params;

	Teams.findByUserId(id)
		.then((teams) => res.status(200).json(teams))
		.catch((err) => res.status(500).json({ message: `Could not get teams for user ${id}.`, error: err }));
});

// 4. Fetch at user's videos
router.get("/:id/videos", validateUserId, (req, res) => {
	const { id } = req.params;

	Videos.findByUserId(id)
		.then((videos) => res.status(200).json(videos))
		.catch((err) => res.status(500).json({ message: `Could not get videos for user ${id}.`, error: err }));
});

// 5. Update a user's info
router.put("/:id", validateUserId, (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Users.update(id, changes)
		.then((updatedUser) => res.status(200).json({ message: `Successfully updated user ${id}.`, updatedUser }))
		.catch((err) => res.status(500).json({ message: `Could not get user ${id}.`, error: err }));
});

module.exports = router;
