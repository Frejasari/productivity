const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:userId", (req, res, next) => {
  res.render("profile/profile");
  // User.findById(req.params.userId).then(user => {});
});

module.exports = router;
