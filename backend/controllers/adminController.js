const College = require("../models/College");
const Cutoff = require("../models/Cutoff");

// ===============================
// COLLEGE MANAGEMENT
// ===============================

const getAdminColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ name: 1 });

    res.json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges.",
      error: error.message,
    });
  }
};

const addCollege = async (req, res) => {
  try {
    const {
      collegeCode,
      name,
      location,
      district,
      state,
      type,
      university,
      autonomous,
      website,
      fees,
      placement,
      rating,
      verified,
      source,
    } = req.body;

    const college = await College.create({
      collegeCode,
      name,
      location,
      district,
      state,
      type,
      university,
      autonomous,
      website,
      fees,
      placement,
      rating,
      verified,
      source,
    });

    res.status(201).json({
      success: true,
      message: "College added successfully.",
      college,
    });
  } catch (error) {
    console.error("Add college error:", error.message);

    res.status(400).json({
      success: false,
      message: "Failed to add college.",
    });
  }
};

const updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    res.json({
      success: true,
      message: "College updated successfully.",
      college,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update college.",
      error: error.message,
    });
  }
};

const deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    // Remove related cutoff records too
    await Cutoff.deleteMany({
      college: req.params.id,
    });

    res.json({
      success: true,
      message: "College and related cutoffs deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete college.",
      error: error.message,
    });
  }
};


// ===============================
// CUTOFF MANAGEMENT
// ===============================

const getAdminCutoffs = async (req, res) => {
  try {
    const cutoffs = await Cutoff.find()
      .populate("college", "name collegeCode")
      .sort({
        exam: 1,
        branch: 1,
        closingRank: 1,
      });

    res.json({
      success: true,
      count: cutoffs.length,
      cutoffs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cutoffs.",
      error: error.message,
    });
  }
};

const addCutoff = async (req, res) => {
  try {
    const {
      exam,
      college,
      year,
      round,
      branch,
      category,
      openingRank,
      closingRank,
    } = req.body;

    const collegeExists = await College.findById(college);

    if (!collegeExists) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    const cutoff = await Cutoff.create({
      exam,
      college,
      year,
      round,
      branch,
      category,
      openingRank,
      closingRank,
    });

    const populatedCutoff = await cutoff.populate(
      "college",
      "name collegeCode"
    );

    res.status(201).json({
      success: true,
      message: "Cutoff added successfully.",
      cutoff: populatedCutoff,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add cutoff.",
      error: error.message,
    });
  }
};

const updateCutoff = async (req, res) => {
  try {
    const cutoff = await Cutoff.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("college", "name collegeCode");

    if (!cutoff) {
      return res.status(404).json({
        success: false,
        message: "Cutoff not found.",
      });
    }

    res.json({
      success: true,
      message: "Cutoff updated successfully.",
      cutoff,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update cutoff.",
      error: error.message,
    });
  }
};

const deleteCutoff = async (req, res) => {
  try {
    const cutoff = await Cutoff.findByIdAndDelete(req.params.id);

    if (!cutoff) {
      return res.status(404).json({
        success: false,
        message: "Cutoff not found.",
      });
    }

    res.json({
      success: true,
      message: "Cutoff deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cutoff.",
      error: error.message,
    });
  }
};


module.exports = {
  getAdminColleges,
  addCollege,
  updateCollege,
  deleteCollege,

  getAdminCutoffs,
  addCutoff,
  updateCutoff,
  deleteCutoff,
};