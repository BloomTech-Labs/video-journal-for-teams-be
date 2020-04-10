const express = require("express");
const sgMail = require("@sendgrid/mail")
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js")

const router = express.Router();

sgMail.setApiKey('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');

const msg = {
  to: ['oakes680@gmail.com', 'chris.oakes@outlook.com'],
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

router.post("/", (req, res) => {
    console.log('hello', req.body)
    
    Users.findByIdEmail(req.body.id)
    .then((item) => {
      console.log('this', item)
      sgMail.send(msg)
      // sgMail.sendMultiple({
      //   to: [item.email],
      //   from: 'soapBX-noreply@soapBX.com',
      //   templateId: '7673c8f0-ad31-40fa-9d74-dca76850903b',
      //   subject: 'Someone commented on your video',
      //   substitutions: {
      //     comment: req.body.post     
      //   },
        
      //   // html: `<strong> ${req.body.post}</strong>`,
      // })
      .then((email) => res.status(200).json('whatis this', email))
		  .catch((err) => res.status(500).json({ message: "Could not send.", error: err }));
    })
    .catch((err) => res.status(500).json({ message: "Could not send.", error: err }));
      
});


router.post("/teams", (req,res) => {
  console.log("reqbody", req.body);
   Teams.getUsersByTeamId(req.body.teamId)
   .then((item) => {
     let teamEmails = item.map(item => item.email) 
     let teamNames = item.map(item => item.team_name) 
    sgMail.sendMultiple({
      to: teamEmails,
      from: 'soapBX-noreply@soapBX.com',
      templateId: '0e0fdabd-eb7e-4d27-beb2-7423f6f66c3f',
      subject: 'New Prompt Has Been Added!',
      substitutions: {
        prompt: req.body.post,
        teamName:  teamNames[0]   
      },
      //html: `<strong> ${req.body.post} </strong>`,
    })
    .then((email) => res.status(200).json(email))
    .catch((err) => res.status(500).json({ err }));
   })

   .catch((err) => res.status(500).json({ err }));



})


module.exports = router;

