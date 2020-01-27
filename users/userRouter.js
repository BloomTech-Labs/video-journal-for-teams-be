const express = require('express');

const Users = require('../users/userModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Users.find()
  .then(users => res.status(200).json(users))
  .catch(err => console.log(err))
})

module.exports = router;