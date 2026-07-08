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
        const complaints = await Complaint.find().populate("createdBy", "name email");
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

module.exports = {
    createComplaint,
    getAllComplaints
};