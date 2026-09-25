const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAdminColleges,
  addCollege,
  updateCollege,
  deleteCollege,
  getAdminCutoffs,
  addCutoff,
  updateCutoff,
  deleteCutoff,
} = require("../controllers/adminController");


// ===============================
// COLLEGE ROUTES
// ===============================

router.get(
  "/colleges",
  protect,
  adminOnly,
  getAdminColleges
);

router.post(
  "/colleges",
  protect,
  adminOnly,
  addCollege
);

router.put(
  "/colleges/:id",
  protect,
  adminOnly,
  updateCollege
);

router.delete(
  "/colleges/:id",
  protect,
  adminOnly,
  deleteCollege
);


// ===============================
// CUTOFF ROUTES
// ===============================

router.get(
  "/cutoffs",
  protect,
  adminOnly,
  getAdminCutoffs
);

router.post(
  "/cutoffs",
  protect,
  adminOnly,
  addCutoff
);

router.put(
  "/cutoffs/:id",
  protect,
  adminOnly,
  updateCutoff
);

router.delete(
  "/cutoffs/:id",
  protect,
  adminOnly,
  deleteCutoff
);


module.exports = router;