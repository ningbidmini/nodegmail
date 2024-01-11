const express = require('express');
const controllers=require('./controllers');
const axios = require('axios');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');
// const credentials = require('./credentials.json');
const bodyParser = require('body-parser')
const getOauth2Client = require('./getOauth2Client');
const {GoogleAuth} = require('google-auth-library');
const credentials = require('./credentials');
const tokens = require('./tokens');


router.get('/mail/user/:email',controllers.getUser)
router.get('/mail/send',controllers.sendMail);
router.get('/mail/drafts/:email', controllers.getDrafts);
router.get('/mail/read/:messageId', controllers.readMail);
router.get('/get/code/:email',controllers.getCode);
router.get('/mail/send:email',controllers.methodSendMail);
// router.get('/login',controllers)


// function
function test(ss){
  console.log('functio nss ',ss);
}
//
function listMessages(auth, query){
  query = 'syberia.hugy@gmail.com';
  return new Promise((resolve, reject) => {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list(
      {
        userId: 'me',
        q:query,
        maxResults:5
      },            (err, res) => {
        if (err) {                    reject(err);
          return;
        }
        if (!res.data.messages) {                    resolve([]);
          return;
        }                resolve(res.data);

                         getMail(res.data.messages[0].id, auth);
      }
    );
  })
}
//
function getMail(msgId, auth){
  console.log(msgId)
  const gmail = google.gmail({version: 'v1', auth});
  //This api call will fetch the mailbody.
  gmail.users.messages.get({
      userId:'me',
      id: msgId ,
  }, (err, res) => {
    console.log(res.data.labelIds.INBOX)
      if(!err){
        console.log("no error")
          var body = res.data.payload.parts[0].body.data;

          var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
          console.log(htmlBody)
          var mailparser = new Mailparser();

          mailparser.on("end", (err,res) => {
              console.log("res",res);
          })

          mailparser.on('data', (dat) => {
              if(dat.type === 'text'){
                  const $ = cheerio.load(dat.textAsHtml);
                  var links = [];
                  var modLinks = [];
                  $('a').each(function(i) {
                      links[i] = $(this).attr('href');
                  });

                  //Regular Expression to filter out an array of urls.
                  var pat = /------[0-9]-[0-9][0-9]/;

                  //A new array modLinks is created which stores the urls.
                  modLinks = links.filter(li => {
                      if(li.match(pat) !== null){
                          return true;
                      }
                      else{
                          return false;
                      }
                  });
                  console.log(modLinks);

                  //This function is called to open all links in the array.

              }
          })

          mailparser.write(htmlBody);
          mailparser.end();

      }
  });
}


// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {
  // console.log('get Client ID :: ',process.env.CLIENT_ID);
  // const CLIENT_ID = process.env.CLIENT_ID;
  // const REDIRECT_URI = process.env.REDIRECT_URI;
  // const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const getcred = credentials();
  const { client_secret, client_id, redirect_uris,refresh_token,responseType } = getcred
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
  // const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uris}&response_type=code&scope=profile email https://mail.google.com/ https://www.googleapis.com/auth/gmail.addons.current.message.action https://www.googleapis.com/auth/gmail.addons.current.message.metadata https://www.googleapis.com/auth/gmail.addons.current.message.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly&include_granted_scopres=true&state=state_parameter_passthrough_value&promt=consent&access_type=offline`;
  // console.log('get URL :',url);
  // res.redirect(url);

  // const { client_secret, client_id, redirect_uris } = credentials.installed;

  //
  // const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send','https://mail.google.com/','https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.labels','https://www.googleapis.com/auth/gmail.metadata'];
  //

  const scopes =['https://www.googleapis.com/auth/gmail.send','https://mail.google.com/','https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.labels','https://www.googleapis.com/auth/gmail.metadata','profile','email'];

  const url = oAuth2Client.generateAuthUrl({
    // access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    response_type: 'code',
  });

  // console.log('Authorize this app by visiting this url:', url);
  res.redirect(url);
});

//


async function getIdTokenFromMetadataServer() {
  const googleAuth = new GoogleAuth();

  const client = await googleAuth.getIdTokenClient(targetAudience);

  // Get the ID token.
  // Once you've obtained the ID token, you can use it to make an authenticated call
  // to the target audience.
  await client.idTokenProvider.fetchIdToken(targetAudience);
  console.log('Generated ID token.');
}


// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  console.log('Call back get code : ',code);
  try {


    // const gettoken = tokens();
    const getcred = credentials();
    // console.log('get Credential: ',getcred);
    const { client_secret, client_id, redirect_uris,refresh_token,responseType } = getcred;

    var {data} = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      redirect_uri: redirect_uris[0],
      // grant_type: 'refresh_token',
      grant_type: 'authorization_code',

    });
    console.log('Log getdata: ',data);
    const { access_token , scope, expires_in , token_type , id_token } = data;
    console.log('Data Access Token : ',access_token);

    const tokenPath = path.join(__dirname, 'token.json');
    fs.writeFileSync(tokenPath, JSON.stringify(data));
    console.log('Access token and refresh token stored to token.json');

    let tokenDetails = await fetch("https://accounts.google.com/o/oauth2/token", {
        "method": "POST",
        "body": JSON.stringify({
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": access_token,
            "grant_type": "refresh_token",
        })
    });
    console.log('tokenDetails : ',await tokenDetails.json());

    const datainfo = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+access_token).then((result)=>{return result.json();});
    console.log('get Data Info : ',datainfo);

    const userpath = path.join(__dirname, 'userinfo.json');
    fs.writeFileSync(userpath, JSON.stringify(datainfo));
    console.log('User Info stored to userinfo.json');

    res.redirect('/api/form/gmail');
  } catch (error) {
    console.error('Error:', error);
    // console.error('Error:', error.response.data.error);
    res.redirect('/api/auth/google');
  }
});

router.get('/test/form',async (req,res)=>{
  // console.log('Show data',req);
  // console.log('test Form');

  if(req.method=="GET"){
    console.log('query : ',req.query);
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify({'data':req.query})
    );
  }
  // let body = '';
  // req.on('data',(result)=>{
  //   body += result.toString();
  //   console.log('data:',result);
  // });
  //
  // req.on('end',(result)=>{
  //
  //   console.log('get method : ',req.method);
  //   console.log('get Body: ',req.body);
  //   // res.send('Data Recieve' + JSON.stringify(req.body));
  //   console.log('get Request: ',body);
  //   res.end('success');
  // });
  // const { fname,lname } = req.body;
  // console.log('Firstname : ',fname);
  // console.log('Lastname : ',lname);
});

router.post('/test/form',async (req,res)=>{
  console.log('POST Data: ',req.body);
  const { fname , lname } = req.body;
  console.log('Firstname : ',fname);
  console.log('Lastname : ',lname);
});

router.get('/get/mail',async (req,res)=>{
  // const TOKEN_PATH = 'token.json';
  // const CREDENTIALS_PATH = 'credentials.json';
  const access_token = tokens().access_token;
  // console.log('path get mail data access_token : ',access_token);
  const refresh_token = credentials().refresh_token;
  // console.log('path get mail data refresh_token: ',refresh_token);
  getOauth2Client().then((auth)=>{
    const gmail = google.gmail({version: 'v1', auth});
    // console.log('Log gmail : ',gmail);
    let query = 'syberia.hugy@gmail.com';
    gmail.users.messages.list(
      {
        userId: 'me',
        q:query,
        maxResults:5
      },            (err, res) => {
        if (err) {                    console.log('Error :',err);
          return;
        }
        if (!res.data.messages) {                    console.log([]);
          return;
        }                console.log(res.data);

                         // getMail(res.data.messages[0].id, auth);
                         console.log(res.data.messages[0].id);
      }
    );
  });
  // getOauth2Client()
  // .then((auth) => {
  //   // console.log('get Auth :',auth);
  //
  //   const gmail = google.gmail({version: 'v1', auth});
  //   gmail.users.labels.list({
  //     userId: 'me',
  //   }, (err, res) => {
  //     if (err) return console.log('The API returned an error: ' + err);
  //     const labels = res.data.labels;
  //     if (labels.length) {
  //       console.log('Labels:');
  //       labels.forEach((label,key) => {
  //         console.log(`- ${label.name}`);
  //         console.log('get Key',key);
  //       });
  //     } else {
  //       console.log('No labels found.');
  //     }
  //   });
  // });
});

router.get('/form/gmail', async (req,res)=>{
  let test = {
    'fname':'Tossapol',
  }
  // res.send('<script>function testmsg(){ alert(""); }</script>');
  res.sendFile(path.join(__dirname+'/forms.html'));
});
router.get('/credential',async (req,res)=>{
  credentials().then((result)=>{
    console.log('get function credential :',result);
  });
});
module.exports = router;
