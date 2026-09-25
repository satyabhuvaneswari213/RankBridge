const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToShortlist,
  getShortlist,
  removeFromShortlist,
} = require("../controllers/shortlistController");

router.post("/", protect, addToShortlist);

router.get("/", protect, getShortlist);

router.delete("/:collegeId", protect, removeFromShortlist);

module.exports = router;