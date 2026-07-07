const Complaint = require("../models/Complaint");

/**
 * @name createComplaintController
 * @description Create a complaint
 */
async function createComplaint(req, res) {
    try {
        const {
            title,
            description,
            imageUrl,
            latitude,
            longitude,
            department,
        } = req.body;

        if (!title || !description || !department) {
            return res.status(400).json({
                success: false,
                message: "Title, description and department are required",
            });
        }

        const complaint = await Complaint.create({
            title,
            description,
            imageUrl,
            latitude,
            longitude,
            department,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully",
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
};