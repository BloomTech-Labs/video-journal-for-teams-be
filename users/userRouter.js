const express = require("express");
const Users = require("../users/userModel.js");
const passport = require("passport");
const router = express.Router();
const { signToken } = require("../middleware/middleware");

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
