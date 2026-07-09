const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();

const { dbConnect } = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");

dbConnect();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.get("/", (req, res) => {
    res.send("Server is up and database is connecting...");
});

// Global error handler — catches multer / Cloudinary errors
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err.message);
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});