const express = require("express");
const sgMail = require("@sendgrid/mail")
const Users = require("../users/userModel.js");

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
      sgMail.sendMultiple({
        to: ['isabella.mozart@gmail.com', item.email],
        from: 'test@example.com',
        subject: 'Someone commented on your video',
        html: `<strong> ${req.body.post}</strong>`,
      })
      .then((email) => res.status(200).json(email))
		  .catch((err) => res.status(500).json({ message: "Could not send.", error: err }));
    })
    .catch((err) => res.status(500).json({ message: "Could not send.", error: err }));


    


   

      
});

module.exports = router;

//hello
