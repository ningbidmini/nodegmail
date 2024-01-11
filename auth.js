// auth.js

const { google } = require('googleapis');
const credentials = require('./credentials.json');

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send','https://mail.google.com/','https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.labels','https://www.googleapis.com/auth/gmail.metadata'];

const url = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: GMAIL_SCOPES,
});

console.log('Authorize this app by visiting this url:', url);
