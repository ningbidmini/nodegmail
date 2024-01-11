const fs = require('fs');
const {google} = require('googleapis');

// The file token.json stores the user's access and refresh tokens
// const TOKEN_PATH = 'token.json';
// const CREDENTIALS_PATH = 'credentials.json';
const credentials = require('./credentials');
const tokens = require('./tokens');
let setcred = null;

module.exports = function() {
  return new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    const getcred = credentials();
    console.log('Get Set Credential : ',getcred);
    if(getcred!=null){
      const gettoken = tokens();
      console.log('Get Set Token : ',gettoken);
      if(gettoken!=null){
        var now = new Date().getTime();
        const { client_secret, client_id, redirect_uris,refresh_token,responseType } = getcred;
        // const oAuth2Client = new google.auth.OAuth2(
        //   client_id,
        //   client_secret,
        //   redirect_uris[0],
        //   refresh_token,
        //   responseType
        // );
        const oAuth2Client = new google.auth.OAuth2(getcred);
        oAuth2Client.setCredentials(gettoken);
        // console.log(oAuth2Client);
        return resolve(oAuth2Client);
      }else{
        return reject('Error loading tokens');
      }
    }else{
      return reject('Error loading Credential file');
    }
  //   fs.readFile(CREDENTIALS_PATH, (err, credentialsContent) => {
  //     if (err) {
  //       return reject('Error loading client secret file');
  //     }
  //     const credentials = JSON.parse(credentialsContent);
  //     fs.readFile(TOKEN_PATH, (err, tokenContent) => {
  //       if (err) {
  //         return reject('Error loading tokens');
  //       }
  //       const token = JSON.parse(tokenContent);
  //       var now = new Date().getTime();
  //       console.log('auth : Token =>',token);
  //       console.log('auth : credentials =>',credentials);
  //       const { client_secret, client_id, redirect_uris,refresh_token,responseType } = credentials.installed;
  //       const oAuth2Client = new google.auth.OAuth2(
  //         client_id,
  //         client_secret,
  //         redirect_uris[0],
  //         refresh_token,
  //         responseType
  //       );
  //       oAuth2Client.setCredentials(token);
  //       console.log('oAuth2Client => ',oAuth2Client);
  //       // return resolve(oAuth2Client);
  //       var getresolve = resolve(oAuth2Client);
  //       console.log('Get Resolve: ',getresolve);
  //     });
  //   });
  });
}
