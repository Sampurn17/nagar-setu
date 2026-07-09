const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");
const { createComplaint, getAllComplaints, getMyComplaints, updateComplaintStatus } = require("../controllers/complaintController");
const upload = require("../middleware/multer");
router.get("/", authUser, getAllComplaints);
router.get("/my", authUser, getMyComplaints);
router.patch("/:id/status", authUser, updateComplaintStatus);

router.post(
    "/",
    authUser,
    upload.single("image"),
    createComplaint
);
module.exports = router;