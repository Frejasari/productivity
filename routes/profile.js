const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.findOne({ username: req.user.username }).then(user => {
    res.render("profile/profile");
  });
});

router.get("/user-settings/:userId", (req, res, next) => {
  let parentSite;
  req.rawHeaders.forEach( element => {
    if(element.includes('http://')){
      parentSite = element;
    }
  })
  console.log(parentSite);
  res.render("profile/user-settings", {parentSite: "/profile"});
});

router.post("/user-settings/:userId", (req, res, next) => {
  // save changes in dtbase:




  console.log("REQ BODY: ",req.body);
  // { username: 'Anna',
  // email: 'anna.testuser@abc.de',
  // newPassword: '',
  // newPasswordConfirm: '',
  // imgUrl: '/images/default-silhouette.jpg' }

  res.redirect("/profile");
});

module.exports = router;

