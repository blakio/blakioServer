const mongoose = require("./index");

const LaborTypeSchema = new mongoose.Schema({
  name: {
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

module.exports = LaborType = mongoose.model("laborTypes", LaborTypeSchema);
