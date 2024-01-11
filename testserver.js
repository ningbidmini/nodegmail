const express = require("express");
const routeserver=require("./routeserver");
const path = require('path');
const apis=require('./api');
require("dotenv").config();

const server = express();
server.use('/api',apis);
server.use('/',routeserver);

// Static Folder
server.use('/assets',express.static(path.join(__dirname,'assets')));
server.use('/views',express.static(path.join(__dirname,'views')));

server.listen(process.env.PORT, () => {
  console.log('Log Data Client ID: ',process.env.CLIENT_ID);
  console.log("listening on port " + process.env.PORT);
});
