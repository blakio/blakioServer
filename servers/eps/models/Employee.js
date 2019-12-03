const mongoose = require("./index");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  isContractor: {
    type: Boolean,
    required: true
  },
  isTechnician: {
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
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
