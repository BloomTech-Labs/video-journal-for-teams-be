const express = require("express");

const Teams = require("../teams/teamModel.js");

const router = express.Router();

const { validateTeamId, validateTeamData, validateMembership } = require("../middleware/middleware");
const { isTeamLead } = require("../utils/utils");

// 9. Fetch all teams
router.get("/", (req, res) => {
	Teams.find()
		.then((teams) => res.status(200).json(teams))
		.catch((err) => res.status(500).json({ message: "Could not get teams.", error: err }));
});

// 10. Fetch team by id
router.get("/:id", validateTeamId, (req, res) => {
	const { id } = req.params;

	Teams.findById(id)
		.then((team) => res.status(200).json(team))
		.catch((err) => res.status(500).json({ message: "Could not get team.", error: err }));
});

// 11. Fetch users in a team
router.get("/:id/users", validateTeamId, (req, res) => {
	const { id } = req.params;

	Teams.getUsersByTeamId(id)
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).json({ message: "Could not get users for this team", error: err }));
});

// 12. Fetch prompts created by a team
router.get("/:id/prompts", validateTeamId, (req, res) => {
	const { id } = req.params;

	Teams.getPromptsByTeamId(id)
		.then((prompts) => res.status(200).json(prompts))
		.catch((err) => res.status(500).json({ message: "Could not get prompts for this team", error: err }));
});

// 13. Fetch team videos nested in prompt array
router.get("/:id/videos", validateTeamId, async (req, res) => {
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

// 14. Add a new team prompt
router.post("/:id/prompts", validateTeamId, validateMembership, (req, res) => {
	const { body } = req;
	const { id } = req.params;
	const promptdata = {
		...body,
		team_id: id,
	};

	if (isTeamLead(req.user.role)) {
		Teams.insertPrompt(promptdata)
			.then((prompt) => {
				res.status(201).json(prompt);
			})
			.catch((err) => res.status(500).json({ message: "Could not create prompt.", err: err }));
	} else {
		res.status(403).json({ message: "Permission denied." });
	}
});

// 15. Add a new team
router.post("/", validateTeamData, (req, res) => {
	const { body } = req;

	Teams.insert(body)
		.then((team) => {
			// after creating team it adds the team creator to the team with team_manager role
			Teams.insertUser({ user_id: req.user.id, role_id: 2, team_id: team[0].id }).then((result) =>
				res.status(201).json(team[0])
			);
		})
		.catch((err) => res.status(500).json({ message: "Could not create team." }));
});

// 16. Add a user to a team
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
				res.status(500).json({ message: "Could not add user to team", error: err });
			});
	} else {
		res.status(400).json({ message: "Must have team_id, user_id, and role_id" });
	}
});

// 17. Delete a user from a team
router.delete("/:id/users/:user_id", validateTeamId, (req, res) => {
	const teamId = req.params.id;
	const userId = req.params.user_id;

	if (userId) {
		Teams.remove(userId, teamId)
			.then((count) => {
				if (count > 0) {
					res.status(200).json({ count: count, message: "User has been removed successfully." });
				} else {
					res.status(404).json({ count: count, message: "User not found in team." });
				}
			})
			.catch((err) => res.status(500).json({ message: "Could not create team." }));
	}
});

// 17. Update team info
router.put("/:id", validateTeamId, (req, res) => {
	const updates = { ...req.body, updated_at: new Date(Date.now()).toISOString() };
	const { id } = req.params;

	if (updates.name || updates.description) {
		Teams.update(id, updates)
			.then((count) => {
				if (count > 0) {
					res.status(200).json(count);
				} else {
					res.status(404).json({ message: "That team id is not available for update." });
				}
			})
			.catch((err) => res.status(500).json({ message: "Could not update team information", error: err }));
	} else {
		res.status(400).json({ message: "Must have a team name or description to update." });
	}

});

module.exports = router;
