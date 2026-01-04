const express = require("express");
const Student = require("../models/Student");
const GradeRange = require("../models/GradeRange");
const Personality = require("../models/Personality");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, subject1, subject2, subject3 } = req.body;

    // Basic validation
    if (
      !name ||
      subject1 == null ||
      subject2 == null ||
      subject3 == null
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const average = (subject1 + subject2 + subject3) / 3;

    // ✅ FIXED FIELD NAMES (min / max)
    const gradeData = await GradeRange.findOne({
      min: { $lte: average },
      max: { $gte: average }
    });

    if (!gradeData) {
      return res.status(400).json({
        message: "No grade range found for this average",
        average
      });
    }

    const grade = gradeData.grade;

    const personalityData = await Personality.findOne({
      minGrade: grade
    });

    if (!personalityData) {
      return res.status(400).json({
        message: "No personality trait found for this grade",
        grade
      });
    }

    const student = await Student.create({
      name,
      subject1,
      subject2,
      subject3,
      average,
      grade,
      personality: personalityData.trait
    });

    res.json({
      name: student.name,
      average,
      grade,
      personality: personalityData.trait
    });

  } catch (error) {
    console.error("Student route error:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
