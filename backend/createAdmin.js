const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const password = await bcrypt.hash(
      "Admin@123456",
      10
    );

    const existingAdmin = await User.findOne({
      email: "admin@rankbridge.com",
    });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      existingAdmin.password = password;

      await existingAdmin.save();

      console.log("Existing user converted to admin ✅");
    } else {
      await User.create({
        name: "RankBridge Admin",
        email: "admin@rankbridge.com",
        password,
        role: "admin",
      });

      console.log("Admin created successfully ✅");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed:", error.message);
  }
};

createAdmin();