const express = require("express");
const Student = require("../models/Student");
const GradeRange = require("../models/GradeRange");
const Personality = require("../models/Personality");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, subject1, subject2, subject3 } = req.body;

  const average = (subject1 + subject2 + subject3) / 3;

  const gradeData = await GradeRange.findOne({
    minAvg: { $lte: average },
    maxAvg: { $gte: average }
  });

  const personalityData = await Personality.findOne({
    minGrade: gradeData.grade
  });

  const student = new Student({
    name,
    subject1,
    subject2,
    subject3,
    average,
    grade: gradeData.grade,
    personality: personalityData.trait
  });

  await student.save();

  res.json(student);
});

module.exports = router;
