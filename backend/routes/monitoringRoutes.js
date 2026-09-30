const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const moisture = 68;
  const temperature = 28;
  const humidity = 73;

  let stress = "Low";

  if (moisture < 35) {
    stress = "High";
  } else if (moisture < 50) {
    stress = "Medium";
  }

  res.json({
    moisture,
    temperature,
    humidity,
    stress,
    ph: 6.7,
    nitrogen: 72,
    phosphorus: 58,
    potassium: 66,
    updatedAt: new Date()
  });
});

module.exports = router;