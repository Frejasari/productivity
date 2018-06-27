const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");
const TaskPackage = require("../models/TaskPackage");

router.get("/show/:projectId", (req, res, next) => {
  Project.findById(req.params.projectId).then(project => {
    TaskPackage.find({ _id: { $in: project._taskPackages } }).then(packages => {
      res.render("project/project", { project, packages });
    });
  });
});

//#region create new Project
router.get("/new-project", (req, res, next) => {
  console.log("NEW PROJECT!");
  res.render("project/newproject");
});

router.post("/new-project", (req, res, next) => {
  createAndSaveNewProject(req.body, req.user._id).then(_ => {
    res.redirect("/profile");
  });
});

function createAndSaveNewProject(project, userId) {
  const newProject = new Project({
    ...project,
    _collaborators: [userId]
  });
  return Promise.all([newProject.save(), User.findByIdAndUpdate(userId, { $push: { _projects: newProject._id } })]);
}
//#endregion

module.exports = router;
