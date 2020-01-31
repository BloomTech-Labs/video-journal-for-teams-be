const express = require('express');

const Teams = require('../teams/teamModel.js');

const router = express.Router();

const { validateTeamId } = require("../middleware/middleware");

router.get('/', (req, res) => {
  Teams.find()
  .then(teams => res.status(200).json(teams))
  .catch(err => console.log(err))
})

router.get('/:id', validateTeamId, (req, res) => {
  const { id } = req.params

  Teams.findById(id)
  .then(team => res.status(200).json(team))
  .catch(err => res.status(500).json({ message: "Could not get team.", error: err }))
})

module.exports = router;