const express = require("express");

const Invites = require("../invites/inviteModel.js");
const Teams = require("../teams/teamModel.js");

const router = express.Router();

router.get("/:code", (req, res) => {
	const { code } = req.params

	Invites.findByCode(code)
		.then(invite => {
			const created = Date.parse(invite.created_at)
			const expires = Date.parse(invite.expires_at)

			if (expires < Date.now()) {
				clg("EXPIRED")
				res.status(200).json({message: "Code is EXPIRED", team_id: -2})
			} else if (invite.isValid === false) {
				clg("INVALID")
				res.status(406).json({message: "Code is INVALID", team_id: -1})
			} else {
				res.status(200).json({team_id: invite.team_id})
			}

		})
		.catch(err => res.status(500).json({ message: "Could not find that invite code.", error: err }))
})

module.exports = router;

function clg(...x) { console.log(...x) }