const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/analyze", authMiddleware, async (req, res) => {
  try {
    const { crop, symptoms } = req.body;

    if (!crop) {
      return res.status(400).json({
        message: "Crop name is required"
      });
    }

    const text = `${symptoms || ""}`.toLowerCase();

    let disease = "Healthy Crop";
    let confidence = 94;
    let severity = "Low";

    if (
      text.includes("spot") ||
      text.includes("brown") ||
      text.includes("lesion")
    ) {
      disease = "Leaf Spot";
      confidence = 91;
      severity = "Medium";
    } else if (
      text.includes("yellow") ||
      text.includes("yellowing")
    ) {
      disease = "Nutrient Deficiency";
      confidence = 89;
      severity = "Medium";
    } else if (
      text.includes("wilting") ||
      text.includes("wilt")
    ) {
      disease = "Possible Wilt Stress";
      confidence = 87;
      severity = "High";
    }

    res.json({
      crop,
      disease,
      confidence,
      severity,
      treatment: [
        "Remove severely affected leaves",
        "Improve field sanitation",
        "Maintain proper irrigation",
        "Monitor the crop for 48 hours"
      ],
      analyzedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({
      message: "Disease analysis failed"
    });
  }
});

module.exports = router;