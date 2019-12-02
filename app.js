const app = require("express")();
const config = require("./config");

const mongodb = require("mongoose");
const connectionString = `mongodb+srv://${config.mongodb.user}:${config.mongodb.pw}@blakioepscluster-9dqqq.mongodb.net/test?retryWrites=true&w=majority`;
mongodb.connect(connectionString, () => console.log("connected successfully to mongodb"))

// eps routes
const eps = require("./eps");

app.use("/", eps);

app.get("/", (req, res) => {
  res.json({
    blakioServer: true
  })
});

app.listen(config.PORT, console.log(`app running on port ${config.PORT}`));
