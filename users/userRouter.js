const express = require("express");
const Users = require("../users/userModel.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { signToken, validateSignup } = require("../middleware/middleware");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => console.log(err));
});

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
