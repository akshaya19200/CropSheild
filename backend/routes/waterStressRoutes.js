const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const moisture = 42;
    const rain = 25;

    let stress = "Low";

    if (moisture < 30) {
      stress = "High";
    } else if (moisture < 45) {
      stress = "Medium";
    }

    res.json({
      moisture,
      rain,
      stress,
      zones: [
        {
          zone: "Zone A",
          moisture: 48,
          status: "Normal"
        },
        {
          zone: "Zone B",
          moisture: 37,
          status: "Monitor"
        },
        {
          zone: "Zone C",
          moisture: 29,
          status: "Critical"
        }
      ]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch water stress data"
    });
  }
});

module.exports = router;