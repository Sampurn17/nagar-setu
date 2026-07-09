const Complaint = require("../models/Complaint");

/**
 * @name createComplaintController
 * @description Create a complaint
 */
async function createComplaint(req, res) {
    try {
        console.log("Reached controller");

        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        const {
            title,
            description,
            latitude,
            longitude,
            department,
        } = req.body;

        const imageUrl = req.file ? req.file.path : "";

        console.log("Creating complaint...");

        const complaint = await Complaint.create({
            title,
            description,
            imageUrl,
            latitude: latitude ? parseFloat(latitude) : undefined,
            longitude: longitude ? parseFloat(longitude) : undefined,
            department,
            createdBy: req.user ? req.user.id : undefined,
        });

        console.log("Complaint created:", complaint);

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            complaint,
        });

    } catch (err) {
        console.error("Controller Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
/**
 * @name getAllComplaints
 * @description get all the complaints
 */
async function getAllComplaints(req, res) {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 }).populate("createdBy", "name email");
        return res.status(200).json({
            success: true,
            complaints,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

/**
 * @name getMyComplaints
 * @description Get complaints created by the logged-in user only
 */
async function getMyComplaints(req, res) {
    try {
        console.log("getMyComplaints - user id:", req.user.id);
        const complaints = await Complaint.find({ createdBy: req.user.id }).sort({ createdAt: -1 }).populate("createdBy", "name email");
        console.log("getMyComplaints - found:", complaints.length, "complaints");
        return res.status(200).json({
            success: true,
            complaints,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

/**
 * @name updateComplaintStatus
 * @description Update the status of a complaint (admin only)
 */
async function updateComplaintStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowed = ['pending', 'assigned', 'in-progress', 'resolved'];
        if (!allowed.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Allowed: ${allowed.join(', ')}`,
            });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: 'after' }
        ).populate("createdBy", "name email");

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            complaint,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    createComplaint,
    getAllComplaints,
    getMyComplaints,
    updateComplaintStatus,
};