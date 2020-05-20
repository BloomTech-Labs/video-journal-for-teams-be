const express = require("express");
const router = express.Router();
const Teams = require("../teams/teamModel");
const Organization = require("../organization/organizationModel");

router.get("/", (req, res) => {
  Teams.find()
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(500).json({ error: err }));
});

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

module.exports = router;
