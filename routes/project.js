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
  createAndSaveNewProject(req.body, req.user._id).then(result => {
    const [newProject, currUser] = result;
    res.redirect(`/project/show/${newProject._id}`);
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

router.post("/modifyContent/:projectId/:packageId", (req, res, next) => {
  let deletedItems = [];
  let checkedItems = [];
  for (var key in req.body) {
    if (key.includes("delete")) deletedItems.push(key.slice(7));
    else checkedItems.push(key);
  }
  TaskPackage.findById(req.params.packageId).then(taskPackage => {
    let toDos = taskPackage.toDos;
    for (let i = toDos.length - 1; i >= 0; i--) {
      let todo = toDos[i];
      todo.isDone = false;
      if (deletedItems.includes(todo._id.toString())) {
        toDos.id(todo._id).remove();
        continue;
      } else if (checkedItems.includes(todo._id.toString())) todo.isDone = true;
    }
    taskPackage.save().then(taskPackage => {
      res.redirect(`/project/show/${req.params.projectId}`);
    });
  });
});

module.exports = router;
