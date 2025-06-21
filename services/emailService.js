// services/emailService.js

const sendEmail = async (to, subject, message) => {
  console.log(`Sending email to ${to} | Subject: ${subject} | Message: ${message}`);
  return true;
};

module.exports = sendEmail;
