const express = require("express");

const Teams = require("../teams/teamModel.js");
const Invites = require("../invites/inviteModel.js");
const greek = require("../invites/greekalpha.json");

const router = express.Router();

const { validateTeamId, validateTeamData, validateMembership, verifyUserToTeam } = require("../middleware/middleware");
const { isTeamLead } = require("../utils/utils");

// 1. Fetch all teams
router.get("/", (req, res) => {
	Teams.find()
		.then((teams) => res.status(200).json(teams))
		.catch((err) => res.status(500).json({ message: "Could not get teams.", error: err }));
});

// 2. Fetch team by id
router.get("/:id", validateTeamId, verifyUserToTeam, (req, res) => {
	res.status(200).json(req.team);
});

// 3. Fetch users in a team
router.get("/:id/users", validateTeamId, verifyUserToTeam, (req, res) => {
	const { id } = req.params;

	Teams.getUsersByTeamId(id)
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).json({ message: `Could not get users for team ${id}`, error: err }));
});

// 4. Fetch prompts created by a team
router.get("/:id/prompts", validateTeamId, verifyUserToTeam, (req, res) => {
	const { id } = req.params;

	Teams.getPromptsByTeamId(id)
		.then((prompts) => res.status(200).json(prompts))
		.catch((err) => res.status(500).json({ message: `Could not get prompts for team ${id}`, error: err }));
});

// 5. Fetch team videos nested in prompt array
router.get("/:id/videos", validateTeamId, verifyUserToTeam, async (req, res) => {
	const { id } = req.params;

	const prompts = await Teams.getPromptsByTeamId(id);
	const videos = await Teams.getVideosByTeamId(id);
	const results = prompts.map((prompt) => {
		return {
			...prompt,
			videos: videos.filter((video) => prompt.id === video.prompt_id),
		};
	});
	if (results) {
		res.status(200).json(results);
	}
});

// 6. Add a new team prompt
router.post("/:id/prompts", validateTeamId, verifyUserToTeam, validateMembership, (req, res) => {
	const { body } = req;
	const { id } = req.params;

	const promptdata = {
		...body,
		team_id: id,
	};

	if (isTeamLead(req.user.role)) {
		if (!body.question || !body.description) {
			res.status(400).json({ message: "Bad question or description." });
		} else {
			Teams.insertPrompt(promptdata)
				.then((prompt) => {
					res.status(201).json(prompt);
				})
				.catch((err) => res.status(500).json({ message: "Could not create prompt.", err: err }));
		}
	} else {
		res.status(403).json({ message: "Permission denied." });
	}
});

// 7. Add a new team
router.post("/", validateTeamData, (req, res) => {
	const { body } = req;

	Teams.insert(body)
		.then((team) => {
			// after creating team it adds the team creator to the team with team_manager role
			Teams.insertUser({ user_id: req.user.id, role_id: 2, team_id: team[0].id })
				.then((result) => {
					result.rowCount === 1 ? res.status(201).json(team) : null;
				})
				.catch((err) =>
					res.status(500).json({ message: `Could not insert ${req.user.id} into team ${team.id}.`, error: err })
				);
		})
		.catch((err) => res.status(500).json({ message: "Could not create team.", error: err }));
});

// 8. Add a user to a team
router.post("/:id/users", validateTeamId, (req, res) => {
	const { id } = req.params;
	const body = { ...req.body, team_id: id };

	if (body.team_id && body.user_id && body.role_id) {
		Teams.insertUser(body)
			.then((count) => {
				if (count.rowCount === 1) {
					res.status(201).json(count);
				}
			})
			.catch((err) => {
				res.status(500).json({ message: `Could not add user ${id} to team`, error: err });
			});
	} else {
		res.status(400).json({ message: `Must have team_id, user_id, and role_id` });
	}
});

// 9. Delete a user from a team
router.delete("/:id/users/:user_id", validateTeamId, verifyUserToTeam, validateMembership, (req, res) => {
	const teamId = req.params.id;
	const userId = req.params.user_id;

	if (isTeamLead(req.user.role)) {
		if (userId) {
			Teams.remove(userId, teamId)
				.then((count) => {
					if (count > 0) {
						res.status(200).json({ count: count, message: `User ${userId} has been removed successfully.` });
					} else {
						res.status(404).json({ count: count, message: `User ${userId} not found in team.` });
					}
				})
				.catch((err) => res.status(500).json({ message: `Could not update information for team ${teamid}.` }));
		}
	} else {
		res.status(403).json({ message: "Permission denied." });
	}
});

// 10. Update team info
router.put("/:id", validateTeamId, verifyUserToTeam, (req, res) => {
	const updates = { ...req.body, updated_at: new Date(Date.now()).toISOString() };
	const { id } = req.params;

	if (updates.name || updates.description) {
		Teams.update(id, updates)
			.then((count) => {
				if (count > 0) {
					res.status(200).json(count);
				} else {
					res.status(404).json({ message: `Team ${id} is not available for update.` });
				}
			})
			.catch((err) => res.status(500).json({ message: `Could not update information for team ${id}.`, error: err }));
	} else {
		res.status(400).json({ message: "Must have a team name or description to update." });
	}
});

// 11. Update a user's team role
router.put("/:id/users/:user_id/role", validateTeamId, verifyUserToTeam, validateMembership, (req, res) => {
	const teamId = req.params.id;
	const userId = req.params.user_id;
	const { role_id } = req.body;

	if (isTeamLead(req.user.role)) {
		if (!role_id) {
			res.status(400).json({ message: "Missing role id." });
		} else {
			Teams.switchRole(teamId, userId, role_id)
				.then((updatedRole) =>
					res
						.status(200)
						.json({ message: `Successfully updated user ${userId} to role ${role_id} on team ${teamId}.`, updatedRole })
				)
				.catch((err) =>
					res.status(500).json({ message: `Could not update information for team ${teamId}.`, error: err })
				);
		}
	} else {
		res.status(403).json({ message: "Permission denied." });
	}
});

// 12. Returns team invite object
router.post("/:id/invite", validateTeamId, verifyUserToTeam, validateMembership, (req, res) => {
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
			res
				.status(400)
				.json({ message: "Request needs to be an object with team_id and team_name elements.", body: req.body });
		}

		// generate a code ahead of time, and create the db object.
		const newcode = genCode(team_name);

		const dbsend = { team_id, newcode: newcode };

		Invites.findByTeam(team_id)
			.then((invite) => {
				const expires = Date.parse(invite.expires_at);

				if (expires > Date.now() && invite.isValid === true) {
					/* 
						THIS FOUND A VIABLE CODE
						It will do nothing but return the existing code.
					 */
					res.status(200).json({ message: "Existing, valid invite code", ...invite });
				}
				if (expires < Date.now() || invite.isValid === false) {
					/* 
						THIS FOUND A NON-VIABLE CODE
						It will use the generated code to
						UPDATE EXISTING in the db and return the code.
					 */
					console.log("Current team code exists, but is either expired or invalid, generating new code.");
					Invites.update(dbsend)
						.then((updated) => {
							res
								.status(200)
								.json({ message: "Team code expiration validity has been successfully refreshed.", ...updated });
						})
						.catch((err) => {
							res.status(500).json({
								message: `Update existing invite ${invite} error.`,
								error: `${err}`,
							});
						});
				}
			})
			.catch((err) => {
				/* 
					THIS CATCH IS A FAILURE TO FIND AN EXISTING, VIABLE CODE.
					It will use the generated code to
					INSERT NEW in the db then return the code.
				 */
				Invites.insert(dbsend)
					.then((inserted) => {
						res.status(200).json({ message: "Creation successful", ...inserted });
					})
					.catch((err) => {
						if (err.detail.includes('not present in table "teams"')) {
							res.status(400).json({ message: `Team ${team_id} doesn't exist.`, error: err.detail });
						} else {
							res.status(500).json({
								message: `Error inserting new invite code for team ${team_id}.`,
								error: err,
							});
						}
					});
			});

		function genCode(team_name) {
			// generate a new code using the first part of name and 3 greek characters
			let cull = team_name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
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
