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
			msg: [readable info]
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

	const { team_id, team_name } = req.body;

	// generate a code ahead of time, and create the db object.
	const newcode = genCode(team_name);

	const dbsend = { team_id, newcode: newcode }

	Invites.findByTeam(team_id)
		.then(invite => {
			clg(70, invite)
			const expires = Date.parse(invite.expires_at)

			if (invite === undefined) { clg("invite undef") }

			if (expires > Date.now() && invite.isValid === true) {
				/* 
					THIS FOUND A VIABLE CODE
					It will do nothing but return the existing code.
				 */
				clg("A CODE EXISTS AND IS VIABLE")
				res.status(200).json({ msg: "Existing, valid invite code", ...invite })
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
						clg(85, updated)
						res.status(200).json({ msg: "Update of expired or invalid successful", ...updated })
					})
					.catch(err => {
						clg(89, err)
						res.status(500).json({
							message: "Update existing invite code error",
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
					clg(109, inserted)
					res.status(200).json({ msg: "Creation successful", ...inserted })
				})
				.catch(err => {
					clg(113, err)
					res.status(500).json({
						message: "Insert new invite code error: ",
						error: `error:${err}`
					})
				})

			clg(120, "Bottom of Invites/POST: \nThat team invitation doesn't exist. One will be made and sent.")
		})


	function genCode(team_name) {
		// generate a new code using the first part of name and 3 greek characters
		let firstword = team_name.split("-")[0]
		firstword = team_name.split(" ")[0];

		// this is needed again as the first one may not catch it.
		firstword = team_name.split("-")[0];

		const newcode = greek[rand(greek.length)] + greek[rand(greek.length)] + greek[rand(greek.length)];
		// clg(118, `${firstword}-${newcode}`);
		return `${firstword}-${newcode}`;
	}

	function rand(max) {
		// generat a random number from 0 to "max" argument
		return Math.floor(Math.random() * Math.floor(max));
	}

})

module.exports = router;

function clg(...x) { console.log(...x) }