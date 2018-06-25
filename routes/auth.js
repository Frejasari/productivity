const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
  })
);

//#region signup
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      console.log("The username already exists");
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
    // check if email is duplicate
    User.findOne({ email }).then(user => {
      if (email !== "" && user !== null) {
        res.render("auth/signup", { message: "There is already an account with this email" });
        return;
      }
      createAndSaveNewUser(username, password, email)
        .then(user => {
          res.redirect("/");
        })
        .catch(err => {
          console.log(err);
          res.render("auth/signup", { message: "Something went wrong" });
        });
    });
  });
});
//#endregion

//#region logout
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
//#endregion

//#region Database utility functions
function createAndSaveNewUser(username, password, email) {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashPass
  });

  return newUser.save();
}
//#endregion

module.exports = authRoutes;
