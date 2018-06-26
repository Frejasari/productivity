const passport = require("passport");
const User = require("../models/User");
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession)
    .populate("_projects")
    .populate("_ideas")
    .then(user => {
      cb(null, user);
    })
    .catch(err => {
      cb(err);
      return;
    });
});
