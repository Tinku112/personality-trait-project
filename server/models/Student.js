const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  subject1: Number,
  subject2: Number,
  subject3: Number,
  average: Number,
  grade: String,
  personality: String
});

module.exports = mongoose.model("Student", studentSchema);
