const signToken = require("./signToken");
<<<<<<< HEAD
const Users = require("../users/userModel.js");

module.exports = {
  signToken,
  validateUserId
=======
const validateSignup = require("./validateSignup");

module.exports = {
  signToken,
  validateSignup,
>>>>>>> dbb875b32fea1e34136f946c7cca86576219a0cd
};

function validateUserId(req, res, next) {
  const { id } = req.params

  Users.findById(id)
    .then((user) => {
      if (user) {
        next()
      } else {
        res.status(400).json({ message: "Invalid user id."})
      }
    })
    .catch(err => res.status(500).json({ message: "'Failed to get user from database'", error: err }))
}