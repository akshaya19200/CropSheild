const Crop = require("../models/Crop");

exports.getCrops = async (req, res) => {
  try {

    const crops = await Crop.find()
      .populate("farm");

    res.json({
      success: true,
      crops
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch crops"
    });
  }
};


exports.createCrop = async (req, res) => {
  try {

    const crop = await Crop.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Crop added successfully",
      crop
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create crop"
    });
  }
};