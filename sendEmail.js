const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'isabella.guofei@gmail.com',
  from: 'isabella.mozart@gmail.com',
  subject: 'Test',
  text: 'Tell me if it is working',
  html: '<strong>Tell me if it is working</strong>',
};
sgMail.send(msg);