const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

require("dotenv").config();

const collegeRoutes = require("./routes/collegeRoutes");
const authRoutes = require("./routes/authRoutes");
const shortlistRoutes = require("./routes/shortlistRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// SECURITY
// ===============================

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

// ===============================
// RATE LIMITING
// ===============================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});

app.use("/api/auth", authLimiter);

// ===============================
// BASIC ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RankBridge API is running 🚀",
  });
});

// ===============================
// API ROUTES
// ===============================

app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shortlist", shortlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

// ===============================
// ENVIRONMENT CHECK
// ===============================

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env");
  process.exit(1);
}

// ===============================
// DATABASE + SERVER
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`RankBridge backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
    process.exit(1);
  });