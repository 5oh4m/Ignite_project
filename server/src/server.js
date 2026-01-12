import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";

dotenv.config();

// Connect to DB (will be cached)
connectDB();

const app = express();

// Middleware to ensure DB is connected for every request (critical for serverless)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        res.status(500).json({ success: false, message: "Database connection error" });
    }
});

// Middleware - CORS FIRST with permissive settings
app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Helmet last with permissive settings
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
}));

// Test route
app.get("/", (req, res) => {
    res.send("MedLink API is running...");
});

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/timeline", timelineRoutes);
import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
});

const PORT = process.env.PORT || 5000;

// Vercel requires exporting the app
export default app;

// Only listen if not running in Vercel (Vercel handles the port)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
