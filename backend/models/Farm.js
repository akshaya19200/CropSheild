const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    farmName: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    crop: {
      type: String,
      required: true,
      trim: true
    },

    soilType: {
      type: String,
      required: true,
      trim: true
    },

    area: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      default: "Healthy"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Farm", farmSchema);