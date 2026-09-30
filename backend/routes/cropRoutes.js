const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const Farm = require("../models/Farm");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({
      userId: req.user.id
    });

    const crops = farms.map((farm) => ({
      id: farm._id,
      farmName: farm.farmName,
      crop: farm.crop,
      soilType: farm.soilType,
      area: farm.area,
      health: farm.status,
      growthStage: "Vegetative",
      moisture: 62 + Math.floor(Math.random() * 15),
      temperature: 26 + Math.floor(Math.random() * 5)
    }));

    res.json(crops);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch crop data"
    });
  }
});

router.get("/overview", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({
      userId: req.user.id
    });

    const totalArea = farms.reduce(
      (sum, farm) => sum + Number(farm.area || 0),
      0
    );

    res.json({
      totalCrops: farms.length,
      totalArea,
      healthy: farms.filter((f) => f.status === "Healthy").length,
      attention: farms.filter((f) => f.status !== "Healthy").length
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch crop overview"
    });
  }
});

module.exports = router;