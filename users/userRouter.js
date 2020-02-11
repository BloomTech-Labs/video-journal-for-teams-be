const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require('../teams/teamModel.js');
const Videos = require('../videos/videoModel.js');
const router = express.Router();

const { validateUserId } = require("../middleware/middleware");

// 4. Fetch all users
router.get("/", (req, res) => {
	Users.find()
		.then((users) => res.status(200).json(users))
		.catch(err => res.status(500).json({ message: "Could not get users.", error: err }));
});

// 5. Fetch user by id
router.get('/:id', validateUserId, (req, res) => {
	const { id } = req.params

	Users.findById(id)
		.then(user => res.status(200).json(user))
		.catch(err => res.status(500).json({ message: "Could not get user.", error: err }))
})

// 6. Fetch a user's teams
router.get('/:id/teams', validateUserId, (req, res) => {
	const { id } = req.params

	Teams.findByUserId(id)
		.then(teams => res.status(200).json(teams))
		.catch(err => res.status(500).json({ message: "Could not get teams for user.", error: err }))
})

// 7. Fetch at user's videos
router.get('/:id/videos', validateUserId, (req, res) => {
	const { id } = req.params

	Videos.findByUserId(id)
		.then(videos => res.status(200).json(videos))
		.catch(err => res.status(500).json({ message: "Could not get videos for user.", error: err }))
})

// 8. Update a user's info
router.put('/:id', validateUserId, (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Users.update(id, changes)
		.then(updatedUser => res.status(200).json({ message: "Successfully updated user", updatedUser }))
		.catch(err => res.status(500).json({ message: "Could not get user.", error: err }))
});

module.exports = router;
