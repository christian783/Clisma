const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const sensorRoutes = require("./routes/sensorRoutes");
require("./controllers/sensorData")
require("./config/realTimeClient")

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sensors", authMiddleware, sensorRoutes);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use('/api/sensors', sensorRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));