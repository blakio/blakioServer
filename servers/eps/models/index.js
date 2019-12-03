const mongoose = require("mongoose");
const connectionString = `mongodb+srv://blakio:blakio@blakioepscluster-9dqqq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionString, () => console.log("connected successfully to mongodb"));
mongoose.connection.on("connected", () => console.log("connected to mongodb"));

module.exports = mongoose;
