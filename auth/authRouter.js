const express = require("express");
const Users = require("../users/userModel");
const Avatars = require("../avatars/avatarModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

const { signToken, validateSignup } = require("../middleware/middleware");

//Okta Auth Login/Register.
//Checks if user exists in Database (we will get user's registering through Okta), if not creates a user with credentials provided by Okta and log's them in.
//If a registered user, log's them in
router.post("/test", (req, res) => {
  Users.findByEmail(req.body.email).then(async (u) => {
    if (u == undefined) {
      let user = req.body;
      //this hashes the subject id as a password
      //In future, remove password column from table, as Okta will handle storing this sensitive info.
      //Password field currently needs to remain in place for iOS, as they are using basic Auth through v1 of api.
      user.password = bcrypt.hashSync(user.password, 8);

      // Pick a random avatar and assign it to new user
      const avatar = await Avatars.find()
        .then((avatars) => {
          const index = Math.floor(Math.random() * (avatars.length - 1));
          return avatars[index].src;
        })
        .catch((err) => {
          res.status(500).json({
            message: `Could not assign avatar ${avatar} to user ${user}.`,
          });
        });

      user.avatar = avatar;
      Users.insert(user).then((user) => res.status(201).json(user));
    } else {
      res.status(200).json(u);
    }
  });
});

//email login
router.post(
  "/login/email",
  passport.authenticate("email-login", { session: false }),
  function (req, res) {
    res.status(200).json(loginSuccessBody(req.user));
  }
);

// 2. Login with username
router.post(
  "/login/username",
  passport.authenticate("username-login", { session: false }),
  function (req, res) {
    res.status(200).json(loginSuccessBody(req.user));
  }
);

// 3. register new user
router.post("/register", validateSignup, async function (req, res) {
  const user = req.user;
  //
  //Hash user password before storing in database
  user.password = bcrypt.hashSync(user.password, 8);

  //Pick a random avatar and assign it to new user
  const avatar = await Avatars.find()
    .then((avatars) => {
      const index = Math.floor(Math.random() * (avatars.length - 1));
      return avatars[index].src;
    })
    .catch((err) => {
      res.status(500).json({
        message: `Could not assign avatar ${avatar} to user ${user}.`,
      });
    });

  user.avatar = avatar;
  //read socket io from req.app.get
  // req.body.organization_id
  //Create new user
  Users.insert(user)
    .then((userId) => {
      user.id = userId[0];
      //Login newly created user
      res.status(201).json(loginSuccessBody(user));
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({ error: "Account already exists" });
      } else {
        res.status(500).json({ message: `Avatar DB error`, error: err });
      }
    });
});

module.exports = router;

function loginSuccessBody(user) {
  const token = signToken({ sub: user.id });
  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      organization_id: user.organization_id,
    },
    token: token,
  };
}
