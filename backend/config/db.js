const mongoose = require("mongoose");

const dbConnect = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected");

    } catch (error) {
        console.error(error);
    }
};

module.exports = { dbConnect };