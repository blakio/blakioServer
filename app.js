const express = require("express");
const app = express();
const config = require("./config");
var cors = require('cors')

// eps routes
const eps = require("./servers/eps/routes");

app.use(cors())
app.use(express.json({ extended: false }))
app.use("/eps", eps);

app.get("/", (req, res) => {
  res.json({
    blakioServer: true })
});

app.listen(config.PORT, console.log(`app running on port ${config.PORT}`));
