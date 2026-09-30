const express = require("express");

const Farm = require("../models/Farm");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(farms);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch farms"
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      farmName,
      location,
      crop,
      soilType,
      area
    } = req.body;

    if (!farmName || !location || !crop || !soilType) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    const farm = await Farm.create({
      userId: req.user.id,
      farmName,
      location,
      crop,
      soilType,
      area: Number(area) || 1,
      status: "Healthy"
    });

    res.status(201).json(farm);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to create farm"
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!farm) {
      return res.status(404).json({
        message: "Farm not found"
      });
    }

    res.json({
      message: "Farm deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete farm"
    });
  }
});

module.exports = router;