const express = require("express");
const router = express.Router();
const Teams = require("../teams/teamModel");
const Organization = require("../organization/organizationModel");
const validateTeamId = require("../middleware/validateUserId");

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

module.exports = router;
