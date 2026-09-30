const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true
    },

    cropName: {
      type: String,
      required: true
    },

    variety: {
      type: String,
      default: ""
    },

    plantingDate: {
      type: Date
    },

    expectedHarvestDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["Healthy", "Warning", "Critical"],
      default: "Healthy"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Crop", cropSchema);