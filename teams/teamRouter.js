const express = require('express');

const Teams = require('../teams/teamModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Teams.find()
  .then(teams => res.status(200).json(teams))
  .catch(err => console.log(err))
})

router.get('/:id', async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id);
        if (team) {
            res.status(200).json(team);
        } else {
            res.status(400).json({ message: 'team cannot be found' })
        }
    } catch (error) {
        res.status(500).json({ error, message: 'unable to find the team' });
    }
});

router.post('/', async (req, res) => {
    try {
        const team = await Teams.insert(req.body);
        if (team) {
            res.status(201).json({ team, message: 'you have successfully added a team' });
        } else {
            res.status(400).json({ message: 'please include all required content' });
        }
    } catch (error) {
        res.status(500).json({ error, message: 'unable to add the team' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Teams.update(req.params.id, req.body);
        if (updatedTeam) {
            res.status(200).json({ updatedTeam, message: 'info updated' });
        } else {
            res.status(404).json({ message: 'team could not be found' });
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: 'unable to update the team' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Teams.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: "team succesfully deleted" });
        } else {
            res.status(404).json({ message: 'team could not be found' });
        }
    } catch (error) {
        res.status(500).json({ error, message: 'unable to delete the team' });
    }
});

module.exports = router;