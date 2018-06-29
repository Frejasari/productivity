const express = require("express");
const router = express.Router();
const User = require("../models/User");
const TaskPackage = require("../models/TaskPackage");

router.get("/", (req, res, next) => {
  User.findOne({ username: req.user.username }).then(user => {
    res.render("profile/profile");
  });
});


router.post("/new-idea", (req, res, next) => {
  const { name, description } = req.body;
  createAndSaveNewIdea({ name, description }, req.user._id).then(package => {
    res.redirect(`/profile`);
  });
});
function createAndSaveNewIdea(package, userId) {
  const newIdea = new TaskPackage(package);
  return Promise.all([newIdea.save(), User.findByIdAndUpdate(userId, { $push: { _ideas: newIdea._id } })]).catch(err =>
    console.log("an error occured when trying to save a new idea", err)
  );
}

router.get("/user-settings/:userId", (req, res, next) => {
  // let parentSite;
  // req.rawHeaders.forEach( element => {
  //   if(element.includes('http://')){
  //     parentSite = element;
  //   }
  // })
  // res.render("/user-settings", {parentSite: "/profile"});

  res.render("profile/user-settings");
});

router.post("/user-settings/:userId", (req, res, next) => {
  // Bcrypt to encrypt passwords
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);

  User.findById(req.params.userId).then(user => {
   
    // check, if password was correct:
    if(!bcrypt.compareSync(req.body.password, user.password)){
      res.render("profile/user-settings", {message: "Incorrect password!"});
      return;

    // check, if two new passwords are equal:
    }else if(req.body.newPassword !== req.body.newPasswordConfirm){
      res.render("profile/user-settings", {message: "New passwords don't match!"});
      return;

    }else{
      // change user properties and save in db
      user.username = req.body.username;
      user.email    = req.body.email;  
      user.imgUrl   = req.body.imgUrl;
      user.password = bcrypt.hashSync(req.body.newPassword, salt);

      user.save();
      res.render("profile/");
    }
  })
  .catch(err => {
    console.log(err);
  });
});
//#endregion

module.exports = router;
