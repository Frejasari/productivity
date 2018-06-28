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

  // Bcrypt to encrypt passwords
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);

  User.findById(req.params.userId).then(user => {
    
  // check, if password was correct:
  if(!bcrypt.compareSync(req.body.password, user.password)){

    // send error message!!
    console.log("NOT CORRECT PASSWORD");

  // check, if two new passwords are equal:
  }else if(req.body.newPassword !== req.body.newPasswordConfirm){
    
    // send error message!!
    console.log("ENTERED NEW PASSWORDS ARE NOT EQUAL!!");

  }else{
    // change user properties and save in db
    user.username = req.body.username;
    user.email    = req.body.email;  
    user.imgUrl   = req.body.imgUrl;
    user.password = bcrypt.hashSync(req.body.newPassword, salt);

    user.save();

    res.redirect("/profile");
  }
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;

