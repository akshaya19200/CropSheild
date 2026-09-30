const Monitoring = require(
  "../models/Monitoring"
);

exports.getMonitoring = async (req, res) => {
  try {

    const data = await Monitoring.find()
      .sort({ recordedAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch monitoring data"
    });
  }
};


exports.createMonitoring = async (req, res) => {
  try {

    const data = await Monitoring.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Monitoring data saved",
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to save monitoring data"
    });
  }
};