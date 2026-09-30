const mongoose = require("mongoose");

const monitoringSchema = new mongoose.Schema(
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

    soilMoisture: {
      type: Number,
      default: 0
    },

    temperature: {
      type: Number,
      default: 0
    },

    humidity: {
      type: Number,
      default: 0
    },

    lightIntensity: {
      type: Number,
      default: 0
    },

    waterLevel: {
      type: Number,
      default: 0
    },

    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Monitoring",
  monitoringSchema
);