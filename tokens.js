const fs = require('fs');
const datatoken = require('./token.json');
module.exports = function() {
  // console.log('show function token:',datatoken);
  const {access_token,scope,token_type,expiry_date,id_token} = datatoken;
  const dataset = {
    access_token: access_token,
    scope: scope,
    token_type: token_type,
    expiry_date: expiry_date,
    id_token: id_token,
  }
  return dataset;
}
