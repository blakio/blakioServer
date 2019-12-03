const mongoose = require("./index");

const JobNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = JobNumber = mongoose.model("jobNumbers", JobNumberSchema);
