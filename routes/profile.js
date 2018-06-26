const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  console.log("PROFILE", req.user);
  User.findOne({ username: req.user.username }).then(user => {
    res.render("profile/profile");
  });
});

module.exports = router;
