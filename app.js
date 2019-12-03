const express = require("express");
const app = express();
const config = require("./config");
// const connection = require("./db/eps");
// connection();

// eps routes
const eps = require("./servers/eps/routes");

app.use(express.json({ extended: false }))
app.use("/eps", eps);

app.get("/", (req, res) => {
  res.json({
    blakioServer: true })
});

app.listen(config.PORT, console.log(`app running on port ${config.PORT}`));


// const mongoose = require("mongoose");
// const connectionString = `mongodb+srv://blakio:blakio@blakioepscluster-9dqqq.mongodb.net/test?retryWrites=true&w=majority`;
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// mongoose.connection.on("connected", () => console.log("connected to mongodb"));
//
// const Schema = mongoose.Schema;
// const EmployeeSchema = new Schema({
//   name: String,
//   jobTitle: String
// })
// const Employee = mongoose.model("employee", EmployeeSchema);
//
// const data = {
//   name: "Isaiah",
//   jobTitle: "Full Stack"
// }
//
// const employee = new Employee(data);
// employee.save(err => {
//   if(err){
//     console.log("error")
//   } else {
//     console.log("success")
//   }
// })
