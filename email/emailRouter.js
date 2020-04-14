const express = require("express");
const sgMail = require("@sendgrid/mail")
const Users = require("../users/userModel.js");
const Teams = require("../teams/teamModel.js")

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: ['oakes680@gmail.com', 'chris.oakes@outlook.com'],
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

router.post("/", (req, res) => {
    console.log('hello', req.body)
    
    Users.findByIdEmail(req.body.id)
    .then((item) => {
      console.log('this', item)
      sgMail.sendMultiple({
        to: [item.email],
        from: 'alpacavideojournal@gmail.com',
        templateId: 'f7245d4e-10d2-447c-b134-3913228ecf4a',
        subject: 'Someone commented on your video',
        substitutions: {
          comment: req.body.post     
        },
        
        // html: `<strong> ${req.body.post}</strong>`,
      })
      .then((email) => res.status(200).json('hi'))
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
      from: 'alpacavideojournal@gmail.com',
      templateId: '525b29ad-6129-4b54-a0de-c93ef82029db',
      subject: 'New Prompt Has Been Added!',
      substitutions: {
        prompt: req.body.post,
        teamName:  teamNames[0]   
      },
      //html: `<strong> ${req.body.post} </strong>`,
    })
    .then((email) => res.status(200).json(console.log('this is good')))
    .catch((err) => res.status(500).json(console.log('this is bad') ));
   })

   .catch((err) => res.status(500).json({ err }));



})


module.exports = router;

