const path = require('path');
// async setview(req,res)=>{
//   res.sendFile(path.join(__dirname+'/views/backend/login.html'));
// });
module.exports = function(getstring) {
  // console.log('show function token:',datatoken);
  console.log('get String :',getstring);
  var splitdata = getstring.split('.');
  console.log('Split Data: ',splitdata);
  // return dataset;
  return async (req,res)=>{
    // console.log(res);
    console.log(splitdata);
    switch (splitdata[0]) {
      case 'admin':
        res.sendFile(path.join(__dirname+'/views/backend/'+splitdata[1]+'.html'));
      break;
      default:
        res.sendFile(path.join(__dirname+'/views/error.html'));
    }
  }
}
