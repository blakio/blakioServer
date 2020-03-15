const mongoose = require("mongoose");
const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const connectionString = `mongodb+srv://${user}:${password}@blakioepscluster-9dqqq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionString, () => console.log("connected successfully to mongodb"));
mongoose.connection.on("connected", () => console.log("connected to mongodb"));

module.exports = mongoose;
