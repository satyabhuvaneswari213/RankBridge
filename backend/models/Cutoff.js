const mongoose = require("mongoose");

const cutoffSchema = new mongoose.Schema(
  {
    exam: {
      type: String,
      enum: [
        "EAMCET",
        "ECET",
        "PGECET",
        "POLYCET",
      ],
      required: true,
    },

    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    round: {
      type: String,
      default: "Final",
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    openingRank: {
      type: Number,
      required: true,
    },

    closingRank: {
      type: Number,
      required: true,
    },

    source: {
      type: String,
      default: "",
      trim: true,
    },

    sourceName: {
      type: String,
      default: "",
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
cutoffSchema.index(
  {
    exam: 1,
    college: 1,
    year: 1,
    round: 1,
    branch: 1,
    category: 1,
  },
  {
    unique: true,
  }
);
module.exports = mongoose.model(
  "Cutoff",
  cutoffSchema
);