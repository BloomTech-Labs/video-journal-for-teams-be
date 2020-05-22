const express = require("express");
const router = express.Router();
const Teams = require("../teams/teamModel");
const Organization = require("../organization/organizationModel");
const Invites = require("../invites/inviteModel");
const validateTeamId = require("../middleware/validateUserId");
const isTeamLead = require("../utils/isTeamLead");
const verifyUserToTeam = require("../middleware/verifyUserToTeam");
const greek = require("../invites/greekalpha.json");
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
              : res.status(404).json({
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

//create invitation link
router.post(
  "/:id/invite/:user_id",
  validateTeamId,
  verifyUserToTeam,
  async (req, res) => {
    const team_id = req.params.id;
    const { user_id } = req.params;
    const { team_name, org_id } = req.body;
    const role = await Teams.getUserRole(team_id, user_id);
    console.log(role, user_id, team_id, org_id);
    //check for proper role permissions
    if (role.role_id !== 3 && role.role_id !== 2) {
      res.status(403).json({ error: "insufficient role to invite user" });
    } else {
      //check for required properties
      if (!team_id || !team_name || !org_id) {
        res.status(400).json({ message: "must contain org_id and team_name" });
      }

      //generate new invite code (see gencode function below) and create object  to send to DB
      const newcode = genCode(team_name);
      const dbsend = { team_id, organization_id: org_id, newcode: newcode };

      Invites.findByTeam(team_id)
        .then((invite) => {
          const expires = Date.parse(invite.expires_at);

          if (expires > Date.now() && invite.isValid) {
            Invites.update(dbsend)
              .then((updated) => res.status(200).json({ ...updated }))
              .catch((err) => res.status(500).json({ error: err }));
          }
        })
        .catch(() => {
          Invites.insert(dbsend)
            .then((inserted) => res.status(200).json({ ...inserted }))
            .catch((err) => {
              err.details.includes('not present in table "teams"')
                ? res.status(400).json({
                    message: `team with id of ${team_id} does not exist`,
                  })
                : res.status(500).json({ error: err });
            });
        });
    }
  }
);
function genCode(team_name) {
  // generate a new code using the first part of name and 3 greek characters
  let cull = team_name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  firstword = cull.split(" ")[0];
  const newcode =
    greek[rand(greek.length)] +
    greek[rand(greek.length)] +
    greek[rand(greek.length)];
  return `${firstword}-${newcode}`;
}

function rand(max) {
  // generate a random number from 0 to "max" argument
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = router;
