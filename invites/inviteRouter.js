const express = require("express");

const Invites = require("./inviteModel.js");
const greek = require("./greekalpha.json");
const Teams = require("../teams/teamModel.js");

const router = express.Router();

// clg(Teams.findById(13));
router.get("/:code", (req, res) => {

	/* 

	:code		invitiation code (team_invite_link.link)

	checks if provided invite code isValid and good.
	
	 */


	const { code } = req.params
	Invites.findByCode(code)
		.then(invite => {
			const expires = Date.parse(invite.expires_at)

			if (expires < Date.now()) {
				clg("EXPIRED")
				res.status(200).json({ message: "Code is EXPIRED", team_id: -2 })
			} else if (invite.isValid === false) {
				clg("INVALID")
				res.status(406).json({ message: "Code is INVALID", team_id: -1 })
			} else {
				res.status(200).json({ team_id: invite.team_id })
			}

		})
		.catch(err => res.status(500).json({ message: "Could not find that invite code.", error: err }))
})

router.post("/", (req, res) => {

	// #region docstring 
	/*

	:teamid			team_id for invite generation (team_invite_link.team_id)

	IF table team_invite_link:
	* .team_id exists 
	* if so, .isValid === true
	* if so, .expires_at has not passed
	THEN 
	* respond to API with existing .link

	ELSE
	* generate code
	* send to db
	* respond to API with generated .link

	*/
	// #endregion 
	
	const { team_id, team_name } = req.body
	
	Invites.findByTeam(team_id)
		.then(invite => {
			const expires = Date.parse(invite.expires_at)
			const existing = 0;
			if (expires > Date.now() && invite.isValid === true) {
				clg("NOT EXPIRED && isValid")
				res.status(200).json({ code: invite.link })
			} else {
				clg("EITHER EXPIRED or !isValid")
				res.status(406).json({ message: "Code is INVALID", team_id: -1 })
			}
		})
		.catch(err => {
			gencode(team_name)
			res.status(500).json({ message: "Invite does not exist for that team.", error: err })
		})

	// let team;
	// Teams.findById(id)
	// 	.then(incoming => {
	// 		clg(incoming.name)
	// 	})
	// 	.catch(err => res.status(500).json({ message: "Could not get team.", error: err }))


	function genCode (name) {
		const adj = adjData[rand(adjData.length)];
	}

	function rand (max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

})

module.exports = router;

function clg(...x) { console.log(...x) }