const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");
const { createComplaint, getAllComplaints } = require("../controllers/complaintController");
const upload = require("../middleware/multer");
router.get("/", authUser, getAllComplaints);

router.post(
    "/",
    authUser,
    upload.single("image"),
    createComplaint
);
module.exports = router;