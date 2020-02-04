const express = require("express");

const Teams = require("../teams/teamModel.js");

const router = express.Router();

const { validateTeamId } = require("../middleware/middleware");

router.get("/", (req, res) => {
  Teams.find()
    .then(teams => res.status(200).json(teams))
    .catch(err => res.status(500).json({ message: "Could not get teams.", error: err }))
})

router.get("/:id", validateTeamId, (req, res) => {
  const { id } = req.params

  Teams.findById(id)
    .then(team => res.status(200).json(team))
    .catch(err => res.status(500).json({ message: "Could not get team.", error: err }))
})

// Get users in a team
router.get("/:id/users", validateTeamId, (req, res) => {
  const {id} = req.params

  Teams.getUsersByTeamId(id)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: "Could not get users for this team", error: err}))
})

// Add a user to a team
router.post("/:id", validateTeamId, (req, res) => {
  const { body } = req

  if(body.team_id && body.user_id && body.role_id){
    Teams.insertUser(body)
      .then(count => {
        if (count.rowCount === 1) {
          res.status(201).json(count)
        }
      })
      .catch(err => res.status(500).json({ message: "Could not add user to team", error: err }))
  } else {
    res.status(400).json({message: "Must have team_id, user_id, and role_id"})
  }
})

// Update team info
router.put("/:id", validateTeamId, (req, res) => {
  const updates = { ...req.body, updated_at: new Date(Date.now()).toISOString() }
  const { id } = req.params

  Teams.update(id, updates)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: 'That team id is not available for update.' })
      }
    })
    .catch(err => res.status(500).json({ message: "Could not update team information", error: err }))
})

module.exports = router;