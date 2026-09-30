const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res) => {
  res.json({
    generatedAt: new Date(),

    summary: {
      farmHealth: 88,
      waterEfficiency: 76,
      diseaseRisk: 18,
      productivity: 82
    },

    monthlyProduction: [
      62,
      68,
      71,
      74,
      79,
      82
    ]
  });
});

module.exports = router;