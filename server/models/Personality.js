const mongoose = require("mongoose");

const personalitySchema = new mongoose.Schema({
  minGrade: String,
  maxGrade: String,
  trait: String
});

module.exports = mongoose.model("Personality", personalitySchema);
