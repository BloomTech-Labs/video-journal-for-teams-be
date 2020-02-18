const express = require("express");
const Users = require("../users/userModel");
const Avatars = require("../avatars/avatarModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

const { signToken, validateSignup } = require("../middleware/middleware");

// 1. Login with email
router.post("/login/email", passport.authenticate("email-login", { session: false }), function (req, res) {
	res.status(200).json(loginSuccessBody(req.user));
});

// 2. Login with username
router.post("/login/username", passport.authenticate("username-login", { session: false }), function (req, res) {
	res.status(200).json(loginSuccessBody(req.user));
});

// 3. register new user
router.post("/register", validateSignup, async function (req, res) {
	const user = req.user;

	//Hash user password before storing in database
	user.password = bcrypt.hashSync(user.password, 8);

	//Pick a random avatar and assign it to new user
	const avatar = await Avatars.find()
		.then((avatars) => {
			const index = Math.floor(Math.random() * (avatars.length - 1));
			return avatars[index].src;
		})
		.catch((err) => {
			res.status(500).json({ message: `Could not assign avatar ${avatar} to user ${user}.` });
		});

	user.avatar = avatar;

	//Create new user
	Users.insert(user)
		.then((userId) => {
			user.id = userId[0];
			//Login newly created user
			res.status(201).json(loginSuccessBody(user));
		})
		.catch((err) => {
			if (err.code === "23505") {
				res.status(409).json({ error: "Account already exists" });
			} else {
				console.log(err);
				res.status(500).json({ message: `Avatar DB error`, error: err });
			}
		});
});

module.exports = router;

function loginSuccessBody(user) {
	const token = signToken({ sub: user.id });

	return {
		user: {
			id: user.id,
			email: user.email,
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			avatar: user.avatar,
		},
		token: token,
	};
}
