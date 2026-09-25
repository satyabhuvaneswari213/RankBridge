const College = require("../models/College");
const Cutoff = require("../models/Cutoff");

// Get all colleges
const getColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ name: 1 });

    res.json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges.",
      error: error.message,
    });
  }
};


// Predict colleges based on rank
const predictColleges = async (req, res) => {
  try {
    const {
      rank,
      exam = "EAMCET",
      branch = "CSE",
      category = "OC",
    } = req.query;

    const studentRank = Number(rank);

    // Validate rank
    if (!studentRank || studentRank <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid rank.",
      });
    }

    // Find matching cutoff records
    const cutoffs = await Cutoff.find({
      exam,
      branch,
      category,
    })
      .populate("college")
      .sort({ closingRank: 1 });

    if (cutoffs.length === 0) {
      return res.json({
        success: true,
        student: {
          rank: studentRank,
          exam,
          branch,
          category,
        },
        count: 0,
        colleges: [],
        message:
          "No cutoff data found for the selected exam, branch and category.",
      });
    }

    // Calculate prediction
    const results = cutoffs.map((cutoff) => {
      const closingRank = cutoff.closingRank;

      let prediction;
      let match;

      if (studentRank <= closingRank * 0.50) {
        prediction = "Safe";
        match = 95;
      } else if (studentRank <= closingRank * 0.80) {
        prediction = "Likely";
        match = 90;
      } else if (studentRank <= closingRank) {
        prediction = "Moderate";
        match = 80;
      } else if (studentRank <= closingRank * 1.25) {
        prediction = "Reach";
        match = 65;
      } else {
        prediction = "Unlikely";
        match = 40;
      }

      return {
        cutoffId: cutoff._id,

        college: cutoff.college,

        exam: cutoff.exam,
        year: cutoff.year,
        round: cutoff.round,
        branch: cutoff.branch,
        category: cutoff.category,

        openingRank: cutoff.openingRank,
        closingRank: cutoff.closingRank,

        prediction,
        match,
      };
    });

    // Put better matches first
    results.sort((a, b) => {
      if (b.match !== a.match) {
        return b.match - a.match;
      }

      return a.closingRank - b.closingRank;
    });

    res.json({
      success: true,

      student: {
        rank: studentRank,
        exam,
        branch,
        category,
      },

      count: results.length,

      colleges: results,
    });

  } catch (error) {
    console.error("Prediction error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to predict colleges.",
      error: error.message,
    });
  }
};
const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    res.json({
      success: true,
      college,
    });
  } catch (error) {
    console.error("College details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch college details.",
      error: error.message,
    });
  }
};


const getCollegeCutoffs = async (req, res) => {
  try {
    const cutoffs = await Cutoff.find({
      college: req.params.id,
    })
      .sort({
        exam: 1,
        branch: 1,
        category: 1,
        closingRank: 1,
      })
      .populate("college", "name collegeCode");

    res.json({
      success: true,
      count: cutoffs.length,
      cutoffs,
    });
  } catch (error) {
    console.error("College cutoff error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch college cutoffs.",
      error: error.message,
    });
  }
};

module.exports = {
  getColleges,
  predictColleges,
  getCollegeById,   
  getCollegeCutoffs,  
};