const mongoose = require("mongoose");

const gradeRangeSchema = new mongoose.Schema({
  minAvg: Number,
  maxAvg: Number,
  grade: String
});

module.exports = mongoose.model("GradeRange", gradeRangeSchema);
