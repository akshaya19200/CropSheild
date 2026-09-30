const Prediction = require(
  "../models/Prediction"
);

exports.getPredictions = async (
  req,
  res
) => {
  try {

    const predictions =
      await Prediction.find()
        .populate("farm")
        .populate("crop")
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      predictions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch predictions"
    });
  }
};


exports.createPrediction = async (
  req,
  res
) => {
  try {

    const prediction =
      await Prediction.create(req.body);

    res.status(201).json({
      success: true,
      message: "Prediction created",
      prediction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create prediction"
    });
  }
};