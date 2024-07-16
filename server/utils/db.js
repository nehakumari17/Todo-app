const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("DB_CONNECT environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDb;