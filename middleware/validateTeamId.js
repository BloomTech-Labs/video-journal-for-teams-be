const Teams = require("../teams/teamModel.js");

module.exports = function validateTeamId(req, res, next) {
  const { id } = req.params;
  Teams.findById(id)
    .then((team) => {
      if (team) {
        req.team = team;
        next();
      } else {
        res.status(404).json({ message: `Team ${id} not found.` });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: `Failed to get team ${id} from database.`,
        error: err,
      })
    );
};
