const signToken = require("./signToken");
const Users = require("../users/userModel.js");

module.exports = {
  signToken,
  validateUserId
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