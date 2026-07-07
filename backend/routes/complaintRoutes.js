const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");
const { createComplaint } = require("../controllers/complaintController");

router.post("/", authUser, createComplaint);

module.exports = router;