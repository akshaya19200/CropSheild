const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// -------------------------
// Middleware
// -------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// -------------------------
// Basic Health Check
// -------------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CropShield AI Backend is running successfully",
    port: PORT
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CropShield AI API is healthy",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

// -------------------------
// API Routes
// -------------------------

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/farms", require("./routes/farmRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));
app.use(
  "/api/monitoring",
  require("./routes/monitoringRoutes")
);
app.use(
  "/api/disease",
  require("./routes/diseaseRoutes")
);
app.use(
  "/api/water-stress",
  require("./routes/waterStressRoutes")
);
app.use(
  "/api/weather",
  require("./routes/weatherRoutes")
);
app.use(
  "/api/analytics",
  require("./routes/analyticsRoutes")
);
app.use(
  "/api/recommendations",
  require("./routes/recommendationsRoutes")
);
app.use(
  "/api/reports",
  require("./routes/reportRoutes")
);

// -------------------------
// 404 Handler
// -------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// -------------------------
// Global Error Handler
// -------------------------

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

// -------------------------
// MongoDB + Server Start
// -------------------------

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing in backend/.env"
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is missing in backend/.env"
      );
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
      console.log(
        `Health check: http://localhost:${PORT}/api/health`
      );
    });
  } catch (error) {
    console.error(
      "Backend startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();