const mongoose = require("mongoose");
const User = require("../models/User");
const College = require("../models/College");

const addToShortlist = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({
        success: false,
        message: "College ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID.",
      });
    }

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.shortlistedColleges.some(
      (id) => id.toString() === collegeId
    )) {
      return res.status(400).json({
        success: false,
        message: "College already shortlisted.",
      });
    }

    user.shortlistedColleges.push(collegeId);

    await user.save();

    res.json({
      success: true,
      message: "College added to shortlist.",
      shortlistedColleges: user.shortlistedColleges,
    });
  } catch (error) {
    console.error("Shortlist error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to add college.",
    });
  }
};

const getShortlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("shortlistedColleges");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      colleges: user.shortlistedColleges,
    });
  } catch (error) {
    console.error("Get shortlist error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shortlist.",
    });
  }
};

const removeFromShortlist = async (req, res) => {
  try {
    const { collegeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.shortlistedColleges =
      user.shortlistedColleges.filter(
        (id) => id.toString() !== collegeId
      );

    await user.save();

    res.json({
      success: true,
      message: "College removed from shortlist.",
    });
  } catch (error) {
    console.error("Remove shortlist error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to remove college.",
    });
  }
};

module.exports = {
  addToShortlist,
  getShortlist,
  removeFromShortlist,
};