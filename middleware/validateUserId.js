const Users = require("../users/userModel.js");

module.exports = function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.findById(id)
    .then((user) => {
      if (user) {
        req.validatedUser = user;
        next();
      } else {
        res.status(404).json({ message: `User ${id} not found.` });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: `Failed to get user ${id} from database.`,
        error: err,
      })
    );
};
