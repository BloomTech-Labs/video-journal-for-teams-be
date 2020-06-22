const express = require("express");
const Organizations = require("../organization/organizationModel");
const router = express.Router();
const Teams = require("../teams/teamModel");

// router.get("/", (req, res) => {
//   Organizations.findById(1)
//     .then((org) => res.status(200).json(org))
//     .catch((err) => res.status(500).json({ error: err }));
// });

//create and add member to organization
router.post("/", (req, res) => {
  const org = req.body.name;
  const uid = req.body.uid;
  Organizations.insert(org)
    .then((_org) => {
      Organizations.insertOrgUser({
        organization_id: _org[0],
        user_id: uid,
        role_id: 3,
      }).then(() => res.status(201).json({ id: _org[0], name: org.name }));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//add member to an org

router.post("/:id/members", (req, res) => {
  const { id } = req.params;
  const userInfo = { ...req.body, organization_id: Number(id) };

  if (userInfo.organization_id && userInfo.user_id && userInfo.role_id) {
    Organizations.insertOrgUser(userInfo)
      .then(() => res.status(201).json(userInfo))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(400).json({ message: "must contain required fields" });
  }
});

// fetch all users in an organization

router.get("/:id/users", (req, res) => {
  const { id } = req.params;
  Organizations.getUsersByOrganization(id)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
});

//fetch teams in an organization

router.get("/:id/teams", (req, res) => {
  const { id } = req.params;
  Organizations.getTeamsByOrganization(id)
    .then((teams) => res.status(200).json(teams))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id/users", (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  Teams.finduserTeamMembership(user_id).then((teams) => {
    if (teams.length) {
      Teams.removeFromAllTeams(user_id).then(() => {
        Organizations.deleteOrganizationMember(id, user_id)
          .then(() => res.sendStatus(204))
          .catch((err) => res.status(500).json({ error: err }));
      });
    } else {
      Organizations.deleteOrganizationMember(id, user_id)
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(500).json({ error: err }));
    }
  });
});
module.exports = router;
