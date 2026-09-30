const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const location = req.query.location || "Coimbatore";

  res.json({
    location,
    temperature: 29,
    feelsLike: 31,
    humidity: 72,
    windSpeed: 14,
    rainfallChance: 38,
    uvIndex: 6,
    condition: "Partly Cloudy",

    forecast: [
      {
        day: "Today",
        temperature: 29,
        rain: 38
      },
      {
        day: "Tomorrow",
        temperature: 30,
        rain: 42
      },
      {
        day: "Day 3",
        temperature: 28,
        rain: 58
      },
      {
        day: "Day 4",
        temperature: 27,
        rain: 64
      },
      {
        day: "Day 5",
        temperature: 30,
        rain: 30
      }
    ]
  });
});

module.exports = router;