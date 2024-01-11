// const { client_secret, client_id, redirect_uris,refresh_token,responseType } = getcred;
// const oAuth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   redirect_uris[0],
//   // refresh_token,
//   // responseType
// );
// oAuth2Client.setCredentials(gettoken);
// console.log('Call Back Get oAuth2Client: ',oAuth2Client);

// oAuth2Client.on('tokens', (tokens) => {
//   if (tokens.refresh_token) {
//     // store the refresh_token in my database!
//     console.log(tokens.refresh_token);
//   }
// });

// oAuth2Client.refreshAccessToken((err, tokens) => {
//   // your access_token is now refreshed and stored in oauth2Client
//   // store these new tokens in a safe place (e.g. database)
//   if(err){
//     console.log('Call Back Error :',err);
//   }
//   console.log('Call Back Get Token: ',tokens);
// });
//
// let { datatokens } = await oAuth2Client.getToken(code);
// console.log('Get Data Token: ',datatokens);
// oauth2Client.setCredentials(datatokens);


// Exchange authorization code for access token
// const CLIENT_ID = process.env.CLIENT_ID;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const APIKEY=process.env.APIKEY;
// const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
// const refresh_token = REFRESH_TOKEN;
// const {client_id,auth_uri,client_secret,refresh_token} = credentials.installed;

// function pass
// const { data } = await axios.post('https://oauth2.googleapis.com/token', {
//   client_id: CLIENT_ID,
//   client_secret: CLIENT_SECRET,
//   // code,
//   code: code,
//   redirect_uri: REDIRECT_URI,
//   grant_type: 'authorization_code',
//
// });
// console.log('get Data : ',data);
//
// const { access_token , scope, expires_in , token_type , id_token } = data;



// console.log('get Access Token :',access_token);
// console.log('get Scope : ',scope);
// console.log('get Expires In : ',expires_in);
// console.log('get Token Type : ',token_type);
// console.log('get ID Token : ',id_token);

// const { datainfo } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token='+access_token,{
//     headers: { Authorization: `Bearer ${access_token}` },
// });
// console.log('get Info ',data);
// console.log('get ID Token : ',id_token);

// const { datainfo } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token='+access_token);
// const { datainfo } = await axios.get('https://oauth2.googleapis.com/tokeninfo?id_token='+access_token);

// Function Pass
// const datatoken = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+access_token).then((result)=>{return result.json();});
// console.log('call back get Token :',datatoken);

// Function Pass
// let tokenDetails = await fetch("https://accounts.google.com/o/oauth2/token", {
//     "method": "POST",
//     "body": JSON.stringify({
//         "client_id": CLIENT_ID,
//         "client_secret": CLIENT_SECRET,
//         "refresh_token": REFRESH_TOKEN,
//         "grant_type": "refresh_token",
//     })
// });
// console.log('tokenDetails : ',await tokenDetails.json());


// const gettoken = tokens();
// const getcred = credentials();
// const oAuth2Client = new google.auth.OAuth2(getcred);
// oAuth2Client.setCredentials(gettoken);
// console.log('Get oAuth2Client: ',oAuth2Client);





// const statusinfo = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+access_token).then((result)=>{return result.json();});
// console.log('get User ID: ',user_id);
// console.log('get e-Mail: ',email);

// console.log('get Data Info : ',datainfo);

// Use access_token or id_token to fetch user profile
// const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//   headers: { Authorization: `Bearer ${access_token}` },
// });

// Code to handle user authentication and retrieval using the profile data

// console.log('get Profile :',profile);
// res.redirect('/api/mail/user/'+profile.email);
// res.redirect('/');

// test(profile.email);
// var example = 'syberia.hugy@gmail.com';
// const { getmail } = await axios.get('https://gmail.googleapis.com/gmail/v1/users/'+email+'/messages?key='+APIKEY,{
//   headers: [{ Authorization: `Bearer ${access_token}` },{Accept: `application/json`}],
// });
// console.log('GetData: ',getmail);

// let dataset = {
//   "access_token":access_token,
//   "refresh_token": refresh_token,
//   "scope": scope,
//   "token_type": token_type,
//   "expiry_date": expires_in,
//   "id_token": id_token
// }
// const tokenPath = path.join(__dirname, 'token.json');
// fs.writeFileSync(tokenPath, JSON.stringify(dataset));
// console.log('Access token and refresh token stored to token.json');
// res.redirect('/api/form/gmail');
// res.redirect('/api/mail/send/'+email);
