const express = require("express");

const Invites = require("./inviteModel.js");
const greek = require("./greekalpha.json");
const Teams = require("../teams/teamModel.js");

const router = express.Router();

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
				clg("A CODE EXISTS AND IS VIABLE")
				res.status(200).json({ code: invite.link })
			} else {
				/* 

				THIS ELSE FOUND A NON-VIABLE CODE

				It will generate, THEN UPDATE EXISTING and return a code.

				 */
				clg("A CODE EXISTS AND IS EITHER EXPIRED or !isValid")

				const dbsend = {
					code: genCode(team_name),
					id: invite.id
				}
				Invites.update(dbsend)
				.then(updated => {
					clg(86,updated)
				})
				.catch(err => {
					clg(err)
				})
			}
		})
		.catch(err => {
			/* 

			THIS CATCH IS A FAILURE TO FIND A VIABLE EXISTING CODE.

			It will generate, THEN INSERT NEW, then return a code.

			 */
			
			genCode(team_name)
			res.status(500).json({ message: "Invite for that team either doesn't exist, is expired, or is invalid", error: err })
		})

	function genCode(team_name) {
		// generate a new code using the first part of name and 3 greek characters
		let firstword = team_name.split("-")[0]
		firstword = team_name.split(" ")[0];

		// this is needed again as the first one may not catch it.
		firstword = team_name.split("-")[0];

		const newcode = greek[rand(greek.length)] + greek[rand(greek.length)] + greek[rand(greek.length)];
		clg(87, `${firstword}-${newcode}`);
	}

	function rand(max) {
		// generat a random number from 0 to "max" argument
		return Math.floor(Math.random() * Math.floor(max));
	}

})

module.exports = router;

function clg(...x) { console.log(...x) }