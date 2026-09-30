const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  res.json({
    productivity: 82,
    cropHealth: 88,
    irrigationEfficiency: 76,
    diseaseRisk: 18,

    weeklyMoisture: [56, 61, 64, 68, 63, 71, 68],

    cropPerformance: [
      {
        crop: "Tomato",
        score: 88
      },
      {
        crop: "Maize",
        score: 81
      },
      {
        crop: "Chilli",
        score: 76
      }
    ]
  });
});

module.exports = router;