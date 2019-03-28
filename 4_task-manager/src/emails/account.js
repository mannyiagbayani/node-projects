const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API)


// const msg = {
//     to: 'manny.i.agbayani@gmail.com',
//     from: 'manny.i.agbayani@gmail.com',
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };
//   sgMail.send(msg);

const sendWelcomeEmail = (name,email) => {
  const msg = {
    to: email,
    from: "manny.i.agbayani@gmail.com",
    subject: "Welcome to Task Manager API",
    text: `Hi ${name}, thank you for choosing  API to manage your tasks`
  };

  sgMail.send(msg);
}


const sendCancellationEmail = (name,email) => {
  const msg = {
    to: email,
    from: "manny.i.agbayani@gmail.com",
    subject: "Cancellation from Task Manager API",
    text: `Hi ${name}, i'm sad to see you leaving`
  };

  sgMail.send(msg);
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}