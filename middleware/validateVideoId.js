const Videos = require("../videos/videoModel.js");

module.exports = function validateVideoId(req, res, next) {
  const { id } = req.params

  Videos.findById(id)
    .then((video) => {
      if (video) {
        next()
      } else {
        res.status(400).json({ message: `Invalid video ${id}.`})
      }
    })
    .catch(err => res.status(500).json({ message: `Failed to get video ${id} from database`, error: err }))
}