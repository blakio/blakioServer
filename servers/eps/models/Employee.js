const mongoose = require("./index");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  jobTitle: {
    type: String
  },
  isContractor: {
    type: Boolean
  },
  isTech: {
    type: Boolean
  },
  isActive: {
    type: Boolean
  },
  jobNumber: String,
  laborType: String,
  clockIn: Date,
  clockOut: Date,
  toLunch: Date,
  fromLunch: Date,
  travelTime: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employee = mongoose.model("employees", EmployeeSchema);
