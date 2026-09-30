const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true
    },

    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop"
    },

    predictionType: {
      type: String,
      enum: [
        "Disease",
        "Water Stress",
        "Crop Health"
      ],
      required: true
    },

    prediction: {
      type: String,
      required: true
    },

    confidence: {
      type: Number,
      default: 0
    },

    severity: {
      type: String,
      default: "Low"
    },

    recommendation: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Prediction",
  predictionSchema
);