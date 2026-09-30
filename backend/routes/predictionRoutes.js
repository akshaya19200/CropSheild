const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getPredictions,
  createPrediction
} = require(
  "../controllers/predictionController"
);

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getPredictions
);

router.post(
  "/",
  authMiddleware,
  createPrediction
);

module.exports = router;