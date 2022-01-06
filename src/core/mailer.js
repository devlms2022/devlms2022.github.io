const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSEMAIL,
      },
      secure: true,
    });
  }

  async sendWaiting({ emailTo, front_name }, cb) {
    const subject = "LMS Information Waiting Confirm";
    const html = `<p>Hello ${front_name} Thank you for registering at LMS. We will inform you again regarding account confirmation</p>`;
    const mailData = {
      from: process.env.EMAIL,
      to: emailTo,
      subject,
      html,
    };

    this.transporter.sendMail(mailData, (err, info) => {
      const promise = new Promise((resolve, reject) => {
        if (err) reject(err);
        else resolve(info);
      });
      cb(promise);
      return promise;
    });
  }
  sendAccepted() {}

  sendRejected() {}
}

module.exports = new Mailer();
