const express = require('express');

const Teams = require('../teams/teamModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Teams.find()
  .then(teams => res.status(200).json(teams))
  .catch(err => console.log(err))
})

module.exports = router;