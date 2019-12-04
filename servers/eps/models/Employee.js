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
  clockIn: String,
  clockOut: String,
  toLunch: String,
  fromLunch: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employee = mongoose.model("employees", EmployeeSchema);
