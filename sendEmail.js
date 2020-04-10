const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'chris.oakes@outlook.com',
  from: 'alpacavideojournal@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
//ES8
