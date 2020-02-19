const express = require("express");

const Invites = require("./inviteModel.js");
const greek = require("./greekalpha.json");
const { validateTeamId, validateMembership } = require("../middleware/middleware");
const { isTeamLead } = require("../utils/utils");

const router = express.Router();

// 1. Fetch invitation code
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
				res.status(403).json({ message: "Code is EXPIRED", team_id: -2 })
			} else if (invite.isValid === false) {
				clg("INVALID")
				res.status(406).json({ message: "Code is INVALID", team_id: -1 })
			} else {
				res.status(200).json({ team_id: invite.team_id })
			}

		})
		.catch(err => res.status(500).json({ message: `Could not find invite code ${code}.`, error: err }))
})

// 2. Returns invite object
router.post("/:id", validateTeamId, validateMembership, (req, res) => {

	// #region docstring 
	/*

	REQUIRES: 
		req.body should be an object in this form: 
		{
			"team_id": 14,
			"team_name": "McClure-Terry"
		}

	WHAT IT DOES: 
		IF table team_invite_link:
		* .team_id exists 
		* if .expires_at has not passed AND .isValid === true
		THEN 
		* respond to API with existing .link

		ELSE
		* if invite exists
			* update the record with a new code, isValid, new expiration
		* if no invite exists
			* create new record
		
		IN ALL CASES respond with a full data object:
		{
			message: [readable info]
			id: 14,
			team_id: 14,
			link: 'McClure-UpsilonAlphaAlpha',
			isValid: true,
			created_at: 2020-01-14T03:49:04.000Z,
			expires_at: 2020-02-06T18:29:10.188Z
		}

	INVITE CODE GENERATION:
		* Breaks the team name on dashes and spaces
		* Uses the first element remaining from team name
		* Generates 3 greek letters
		* Creates a single word: McClure-ThetaPhiTau
	*/
	// #endregion 
	const team_id = req.params.id;
	const { team_name } = req.body;

	if (!isTeamLead(req.user.role)) {
		res.status(403).json({ message: "Permission denied." });
	} else {
		if (!team_id || !team_name) {
			res.status(400).json({ message: "Request needs to be an object with team_id and team_name elements.", body: req.body })
		}

		// generate a code ahead of time, and create the db object.
		const newcode = genCode(team_name);

		const dbsend = { team_id, newcode: newcode }

		Invites.findByTeam(team_id)
			.then(invite => {
				const expires = Date.parse(invite.expires_at)

				if (expires > Date.now() && invite.isValid === true) {
					/* 
						THIS FOUND A VIABLE CODE
						It will do nothing but return the existing code.
					 */
					res.status(200).json({ message: "Existing, valid invite code", ...invite })
				}
				if (expires < Date.now() || invite.isValid === false) {
					/* 
						THIS FOUND A NON-VIABLE CODE
						It will use the generated code to
						UPDATE EXISTING in the db and return the code.
					 */
					clg("A CODE EXISTS AND IS EITHER EXPIRED or !isValid")
					Invites.update(dbsend)
						.then(updated => {
							res.status(200).json({ message: "Update of code (expired or invalid) successful", ...updated })
						})
						.catch(err => {
							res.status(500).json({
								message: `Update existing invite ${invite} error.`,
								error: `${err}`
							})
						})
				}
			})
			.catch(err => {
				/* 
					THIS CATCH IS A FAILURE TO FIND AN EXISTING, VIABLE CODE.
					It will use the generated code to
					INSERT NEW in the db then return the code.
				 */
				Invites.insert(dbsend)
					.then(inserted => {
						res.status(200).json({ message: "Creation successful", ...inserted })
					})
					.catch(err => {
						// clg(113, err.detail)
						if (err.detail.includes("not present in table \"teams\"")) {
							res.status(400).json({ message: `Team ${team_id} doesn't exist.`, error: err.detail })
						} else {
							res.status(500).json({
								message: `Error inserting new invite code for team ${team_id}.`,
								error: err
							})
						}
					})

				// clg(120, "Bottom of Invites/POST: \nThat team invitation doesn't exist. One will be made and sent.")
			})


		function genCode(team_name) {
			// generate a new code using the first part of name and 3 greek characters
			let cull = team_name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
			firstword = cull.split(" ")[0];
			const newcode = greek[rand(greek.length)] + greek[rand(greek.length)] + greek[rand(greek.length)];
			return `${firstword}-${newcode}`;
		}

		function rand(max) {
			// generate a random number from 0 to "max" argument
			return Math.floor(Math.random() * Math.floor(max));
		}
	}
});

module.exports = router;

function clg(...x) { console.log(...x) }
