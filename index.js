
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

// Set the access token
oAuth2Client.setCredentials({
  access_token: 'YOUR_ACCESS_TOKEN',
});

// Create the transporter using OAuth2 authentication
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'your.email@gmail.com',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',
    accessToken: oAuth2Client.getAccessToken(),
  },
});

// Compose the email
const mailOptions = {
  from: 'your.email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
