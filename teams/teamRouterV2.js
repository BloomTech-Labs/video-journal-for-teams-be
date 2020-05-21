const express = require("express");
const router = express.Router();
const Teams = require("../teams/teamModel");
const Organization = require("../organization/organizationModel");
const validateTeamId = require("../middleware/validateUserId");
const isTeamLead = require("../utils/isTeamLead");
const verifyUserToTeam = require("../middleware/verifyUserToTeam");
const ValidateMembership = require("../middleware/validateMembership");

//fetch all teams (for testing api)

router.get("/", (req, res) => {
  Teams.find()
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(500).json({ error: err }));
});

//create team, then insert team member

router.post("/", (req, res) => {
  const { team } = req.body;
  const { id } = req.body;

  Teams.insert(team)
    .then((t) => {
      Teams.insertUser({
        user_id: id,
        role_id: 2,
        team_id: t[0].id,
      }).then(() => res.status(201).json(t));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//fetch all users in a team

router.post("/:id/users", (req, res) => {
  const { id } = req.params;

  const body = { ...req.body, team_id: id };
  console.log(req.body, id, body);

  if (body.team_id && body.user_id && body.role_id && body.organization_id) {
    const user = {
      user_id: body.user_id,
      role_id: body.role_id,
      team_id: id,
    };
    Teams.insertUser(user)
      .then(() => {
        const io = req.app.get("io");
        io.emit("registeredUser");
        Organization.insertOrgUser({
          user_id: body.user_id,
          organization_id: req.body.organization_id,
          role_id: 4,
        })
          .then((count) => count.rowCount === 1 && res.status(201).json(count))
          .catch((err) => res.status(500).json({ error: err }));
      })
      .catch((err) =>
        res.status(400).json({
          error: err,
          message: "must contain team_id, user_id, and role_id",
        })
      );
  }
});

//fetch a team by team_id

router.get("/:id", validateTeamId, (req, res) => {
  const { id } = req.params;

  Teams.findById(id)
    .then((team) => res.status(200).json(team))
    .catch((err) => console.log(err));
});

//fetch team users

router.get("/:id/users", validateTeamId, (req, res) => {
  const { id } = req.params;

  Teams.getUsersByTeamId(id)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
});

//fetch nested team videos in prompts

router.get("/:id/videos", async (req, res) => {
  const { id } = req.params;
  try {
    const prompts = await Teams.getPromptsByTeamId(id);
    const videos = await Teams.getVideosByTeamId(id);

    const results = prompts.map((prompt) => {
      return {
        ...prompt,
        videos: videos.filter((video) => prompt.id === video.prompt_id),
      };
    });
    results && res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// delete a user from the team if team lead

router.delete(
  "/:id/users/:user_id/",
  validateTeamId,
  verifyUserToTeam,
  async (req, res) => {
    const { id, user_id } = req.params;
    const role = await Teams.getUserRole(id, user_id);

    if (!role) {
      res
        .status(404)
        .json({ message: `user with id of ${user_id} is not on the team` });
    } else {
      if (isTeamLead(role.role_id)) {
        user_id &&
          Teams.remove(user_id, id).then((count) =>
            count > 0
              ? res.status(200).json({
                  message: `user with id of ${user_id} successfully deleted from team`,
                })
              : res
                  .status(404)
                  .json({
                    message: `unable to find user with id of ${user_id}`,
                  })
          );
      } else {
        res
          .status(403)
          .json({ message: `you don't have permission to delete teammates` });
      }
    }
  }
);
module.exports = router;
