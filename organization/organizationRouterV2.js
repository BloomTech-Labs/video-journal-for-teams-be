const express = require("express");
const Organizations = require("../organization/organizationModel");
const router = express.Router();

// router.get("/", (req, res) => {
//   Organizations.findById(1)
//     .then((org) => res.status(200).json(org))
//     .catch((err) => res.status(500).json({ error: err }));
// });

router.post("/", (req, res) => {
  console.log(req.body);
  const org = req.body.name;
  const uid = req.body.uid;
  console.log(org);
  Organizations.insert(org)
    .then((_org) => {
      console.log(_org);
      Organizations.insertOrgUser({
        organization_id: _org[0],
        user_id: uid,
        role_id: 3,
      }).then(() => res.status(201).json({ id: _org[0], name: org.name }));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
