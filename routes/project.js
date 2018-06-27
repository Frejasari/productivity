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

router.post('/checkboxChecked/:packageId', (req, res, next) => {

  console.log("CHECK HERE:", req.body);

  TaskPackage.findById(req.params.packageId)
  .then(taskPackage => {

    // modify tasks accordingly:
    taskPackage.toDos

    taskPackage.save()
    console.log("taskPackage:", taskPackage);
    // res.redirect("/project/"+req.params.packageId) // redirect to projecdID site
  })
  // TaskPackage.findByIdAndUpdate(req.params.packageId)

  // change the value of isDone property of correct todo-item in the database:

  // let myIds = Object.keys(req.body) //potentieller array mit ids
  // let status = req.body

  // TaskPackage.toDos.findById(myId).then( todo => {
  //   console.log("TASK PACKAGE TODO SEARCH: ",todo);
  // });

 // what's my task package? how do I find one todo in there? 
 // render view with updated information

//  res.render("/project/project");

});

module.exports = router;
