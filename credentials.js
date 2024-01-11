const fs = require('fs');
// const credentials = 'credentials.json';
const credentials = require('./credentials.json');
module.exports = function() {
  // const client_id = process.env.CLIENT_ID;
  // const redirect_uris = process.env.REDIRECT_URI;
  // const client_secret = process.env.CLIENT_SECRET;
  // const refresh_token = process.env.REFRESH_TOKEN;
  // const responseType = process.env.RESPONSETYPE;
  const {client_id,project_id,auth_uri,token_uri,client_secret,redirect_uris,refresh_token,responseType,auth_provider_x509_cert_url} = credentials.installed;  
  const dataset = {
    client_id: client_id,
    client_secret: client_secret,
    redirect_uris: redirect_uris,
    refresh_token: refresh_token,
    responseType: responseType,
  }
  return dataset;
  // return () => {
  //   let dataset = {};
  //   // Load client secrets from a local file.
  //   fs.readFile(credentials, (err, credentialsContent) => {
  //     if (err) {
  //       return reject('Error loading Credential file');
  //     }
  //     const credentials = JSON.parse(credentialsContent);
  //     // console.log('auth : credentials =>',credentials);
  //     // const { client_secret, client_id, redirect_uris,refresh_token,responseType } = credentials.installed;
  //     // return credentials.installed
  //     dataset = credentials.installed;
  //   });
  //   return dataset;
  // };
}
