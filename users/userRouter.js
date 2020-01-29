const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require('../teams/teamModel.js');
const passport = require("passport");
const router = express.Router();
const { signToken, validateUserId } = require("../middleware/middleware");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => console.log(err));
});

router.get('/:id/teams', validateUserId, (req, res) => {
  const { id } = req.params

  Teams.findByUserId(id)
  .then(teams => res.status(200).json(teams))
  .catch(err => res.status(500).json({ message: "Could not get teams for user.", error: error }))
})

router.post("/login/email", passport.authenticate("email-login", { session: false }), function(req, res) {
  res.status(200).json(loginSuccessBody(req.user));
});

router.post("/login/username", passport.authenticate("username-login", { session: false }), function(req, res) {
  res.status(200).json(loginSuccessBody(req.user));
});

module.exports = router;

function loginSuccessBody(user) {
  const token = signToken({ sub: user.id });

  return {
    user: {
      email: user.email,
      username: user.username,
    },
    token: token,
  };
}
