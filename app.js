const express = require("express");
const routes=require("./routes");
// const webs=require("./webs");
const path = require('path');
require("dotenv").config();

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/assets',express.static(path.join(__dirname,'assets')));
app.use('/api',routes);

app.listen(process.env.PORT, () => {
  console.log('Log Data Client ID: ',process.env.CLIENT_ID);
  console.log("listening on port " + process.env.PORT);
});


// app.use('/',webs);
// app.get("/", async (req, res) => {
//   // const result=await sendMail();
//   res.send("Welcome to Gmail API with NodeJS");
// });
