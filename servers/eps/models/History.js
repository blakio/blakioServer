const mongoose = require("./index");

const HistorySchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
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
  isTech: {
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  jobNumber: String,
  laborType: String,
  clockIn: Date,
  clockOut: Date,
  toLunch: Date,
  fromLunch: Date,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = History = mongoose.model("history", HistorySchema);
