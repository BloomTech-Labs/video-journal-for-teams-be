const db = require("../../users/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

passport.use(
  "username-login",
  new Strategy(function(username, password, verify) {
    db.findByUsername(username)
      .then((user) => {
   
        if (!user) {
          return verify(null, false, "Invalid username/password combination.");
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return verify(null, false, "Invalid username/password combination.");
        }
      
        return verify(null,  user)
        
      })
      .catch((err) => {
        return verify(err);
      });
  })
);
