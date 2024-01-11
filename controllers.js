const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");

const MailComposer = require('nodemailer/lib/mail-composer');
const credentials = require('./credentials.json');
const tokens = require('./token.json');

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// async function sendMail(req, res) {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// }
async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: "The Gmail API with NodeJS works",
    };

    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}



// async function getUser(req, res) {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// }
async function getUser(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

// async function getDrafts(req, res) {
//   try {
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }
async function getDrafts(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}


// async function readMail(req, res) {
//   try {
//   } catch (error) {
//     res.send(error);
//   }
// }
async function readMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/sid.cd.varma@gmail.com/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;

    res.json(data);
  } catch (error) {
    res.send(error);
  }
}

async function getCode(req, res){
  try {
    // const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
    // const { token } = await oAuth2Client.getAccessToken();
    // const config = generateConfig(url, token);
    // const response = await axios(config);
    // console.log('income function');
    const dataset = {
      'email': req.params.email
    }
    res.json(dataset);
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function methodSendMail(req,res){
  const getGmailService = () => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(tokens);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    return gmail;
  };

  const encodeMessage = (message) => {
    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const createMail = async (options) => {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return encodeMessage(message);
  };

  const sendMail = async (options) => {
    const gmail = getGmailService();
    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: rawMessage,
      },
    });
    return id;
  };
}
module.exports = {
  getUser,
  sendMail,
  getDrafts,
  readMail,
  getCode,
  methodSendMail,
};
