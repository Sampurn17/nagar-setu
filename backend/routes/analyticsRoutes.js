const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");
const Complaint = require("../models/Complaint");

/**
 * @name getDepartmentCounts
 * @description Aggregate complaints grouped by department
 */
router.get("/department-counts", authUser, async (req, res) => {
    try {
        const data = await Complaint.aggregate([
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const formattedData = data.map(item => ({
            name: item._id || "Unassigned",
            value: item.count
        }));
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @name getStatusCounts
 * @description Aggregate complaints grouped by status
 */
router.get("/status-counts", authUser, async (req, res) => {
    try {
        const data = await Complaint.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const formattedData = data.map(item => ({
            status: item._id || "pending",
            count: item.count
        }));
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
