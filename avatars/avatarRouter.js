const express = require("express");
const Avatars = require("./avatarModel");
const router = express.Router();

// 1. Fetch all placeholder avatars
router.get("/", (req, res) => {
	Avatars.find()
		.then((avatars) => res.status(200).json(avatars))
		.catch((err) => res.status(500).json({ message: "Could not get avatars.", error: err }));
});

module.exports = router;
