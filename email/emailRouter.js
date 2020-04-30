const express = require("express");
const sgMail = require("@sendgrid/mail");
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js");

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", (req, res) => {
  Users.findByIdEmail(req.body.id)
    .then((item) => {
      sgMail
        .sendMultiple({
          to: [item.email],
          from: "alpacavideojournal+123@gmail.com",
          templateId: "49c28261-ea82-415f-a224-dfe578e7acda",
          subject: "Someone commented on your video",
          substitutions: {
            comment: req.body.post,
          },
        })
        .then((email) => res.status(200).json("hi"))
        .catch((err) =>
          res.status(500).json({ message: "Could not send.", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Could not send.", error: err })
    );
});

router.post("/teams", (req, res) => {
  Teams.getUsersByTeamId(req.body.teamId)
    .then((item) => {
      let teamEmails = item.map((item) => item.email);
      let teamNames = item.map((item) => item.team_name);
      sgMail
        .sendMultiple({
          to: teamEmails,
          from: "alpacavideojournal+123@gmail.com",
          templateId: "08f7389d-f78a-4e7b-a2e3-346793097f27",
          subject: "New Prompt Has Been Added!",
          substitutions: {
            prompt: req.body.post,
            teamName: teamNames[0],
          },
        })
        .then((email) => res.status(200).json({ message: "emai sent" }))
        .catch((err) =>
          res.status(500).json({ error: "Could not send the email" })
        );
    })

    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
