const express = require("express");
const sgMail = require("@sendgrid/mail")

const router = express.Router();

sgMail.setApiKey('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');


router.post("/", (req, res) => {
    console.log('hello', req.body)
    const msg = {
        to: ['oakes680@gmail.com', 'chris.oakes@outlook.com'],
        from: 'test@example.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.sendMultiple(msg)
      .then((email) => res.status(200).json(email))
		.catch((err) => res.status(500).json({ message: "Could not send.", error: err }));
});

module.exports = router;
