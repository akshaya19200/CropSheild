const Farm = require("../models/farm");

exports.getFarms = async (req, res) => {
  try {

    const farms = await Farm.find({
      farmer: req.user.userId
    }).populate(
      "farmer",
      "name email"
    );

    res.json({
      success: true,
      count: farms.length,
      farms
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch farms"
    });
  }
};


exports.createFarm = async (req, res) => {
  try {

    const {
      farmName,
      location,
      area,
      soilType,
      irrigationType
    } = req.body;

    const farm = await Farm.create({
      farmer: req.user.userId,
      farmName,
      location,
      area,
      soilType,
      irrigationType
    });

    res.status(201).json({
      success: true,
      message: "Farm created successfully",
      farm
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create farm"
    });
  }
};