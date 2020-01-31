const express = require("express");
const Users = require("../users/userModel.js");
const Teams = require('../teams/teamModel.js');
const Videos = require('../videos/videoModel.js');
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

const { signToken, validateUserId, validateSignup } = require("../middleware/middleware");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: "Could not get users.", error: err }));
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params

  Users.findById(id)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({ message: "Could not get user.", error: err }))
})

router.get('/:id/teams', validateUserId, (req, res) => {
  const { id } = req.params

  Teams.findByUserId(id)
  .then(teams => res.status(200).json(teams))
  .catch(err => res.status(500).json({ message: "Could not get teams for user.", error: err }))
})

router.get('/:id/videos', validateUserId, (req, res) => {
  const { id } = req.params

  Videos.findByUserId(id)
  .then(videos => res.status(200).json(videos))
  .catch(err => res.status(500).json({ message: "Could not get videos for user.", error: err }))
})

router.post("/login/email", passport.authenticate("email-login", { session: false }), function(req, res) {
  res.status(200).json(loginSuccessBody(req.user));
});

router.post("/login/username", passport.authenticate("username-login", { session: false }), function(req, res) {
  res.status(200).json(loginSuccessBody(req.user));
});

router.post("/register", validateSignup, function(req, res) {
  const user = req.user;

  //Hash user password before storing in database
  user.password = bcrypt.hashSync(user.password, 8);

  //Create new user
  Users.insert(user)
    .then((userId) => {
      user.id = userId;
      //Login newly created user
      res.status(201).json(loginSuccessBody(user));
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({ error: "Account already exists" });
      } else {
        res.status(500).json(err);
      }
    });
});

router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await Users.update(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json({ updatedUser, message: "info updated" });
        } else {
            res.status(404).json({ message: "user could not be found" });
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: "unable to update this user" });
    }
});

module.exports = router;

function loginSuccessBody(user) {
  const token = signToken({ sub: user.id });

  return {
    user: {
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    },
    token: token,
  };
}