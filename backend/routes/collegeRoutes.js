const express = require("express");
const router = express.Router();

console.log("Raw Controller Exports:", require("../controllers/collegeController"));

const {
  getColleges,
  predictColleges,
  getCollegeById,
  getCollegeCutoffs,
} = require("../controllers/collegeController");


router.get("/", getColleges);

router.get("/predict", predictColleges);

router.get("/:id", getCollegeById);

router.get("/:id/cutoffs", getCollegeCutoffs);


module.exports = router;