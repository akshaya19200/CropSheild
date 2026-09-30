const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  res.json([
    {
      priority: "High",
      title: "Increase irrigation for Zone C",
      description:
        "Soil moisture is below the recommended range. Schedule irrigation within the next cycle.",
      category: "Water"
    },
    {
      priority: "Medium",
      title: "Monitor Leaf Health",
      description:
        "Perform an early disease inspection on tomato leaves.",
      category: "Disease"
    },
    {
      priority: "Low",
      title: "Check soil nutrients",
      description:
        "Nutrient levels can be reviewed before the next fertilizer cycle.",
      category: "Soil"
    },
    {
      priority: "Medium",
      title: "Rainfall preparation",
      description:
        "Forecast indicates increased rainfall in the next few days.",
      category: "Weather"
    }
  ]);
});

module.exports = router;