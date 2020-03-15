const express = require("express");
const app = express();
const config = require("./config");
var cors = require('cors')
const fn = require("./fn");
require('dotenv').config();

// eps routes
const eps = require("./servers/eps/routes");

app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.json());

app.get("/", fn.isLive);
app.get("/ip", fn.sendIP);

app.post("/email", fn.sendMail);

app.use("/eps", eps);

app.listen(config.PORT, console.log(`app running on port ${config.PORT}`));

// turn off the secure mailing option to use gmail
// https://myaccount.google.com/lesssecureapps