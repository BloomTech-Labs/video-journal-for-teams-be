const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js");
const Videos = require("../videos/videoModel.js");
const Organizations = require("../organization/organizationModel.js");
const router = express.Router();

//select all users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
});

//find by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id/organizations", (req, res) => {
  const { id } = req.params;
  Organizations.getOrganzationsByUser(id)
    .then((orgs) => res.status(200).json(orgs))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id/teams/:org_id", (req, res) => {
  const { id, org_id } = req.params;

  Teams.findByUserId(id, org_id)
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id/videos/:org_id", (req, res) => {
  const { id, org_id } = req.params;

  Videos.findByUserId(id, org_id)
    .then((vids) => res.status(200).json(vids))
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
