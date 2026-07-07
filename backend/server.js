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
app.get("/", (req, res) => {
    res.send("Server is up and database is connecting...");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});