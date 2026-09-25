const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    collegeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      default: "Andhra Pradesh",
      trim: true,
    },

    type: {
      type: String,
      enum: ["Government", "Private"],
      required: true,
    },

    university: {
      type: String,
      default: "",
      trim: true,
    },

    autonomous: {
      type: Boolean,
      default: false,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    fees: {
      type: String,
      default: "",
    },

    placement: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    source: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("College", collegeSchema);