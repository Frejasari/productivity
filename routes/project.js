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
  let values = [];
  let newTodo;

  console.log("BODY WITH TEXTAREA", req.body);

  for (var key in req.body) {
    if (key.includes("delete")) deletedItems.push(key.slice(7));
    else if (key.includes("value")) values.push({ _id: key.slice(6), task: req.body[key] });
    else if (key === "new-todo") newTodo = { task: req.body[key] };
    else checkedItems.push(key);
  }

  TaskPackage.findById(req.params.packageId).then(taskPackage => {
    let toDos = taskPackage.toDos;
    for (let i = toDos.length - 1; i >= 0; i--) {
      let todo = toDos[i];
      todo.isDone = false;
      let currId = todo._id.toString();
      if (deletedItems.includes(currId)) {
        toDos.id(todo._id).remove();
        continue;
      } else if (checkedItems.includes(todo._id.toString())) todo.isDone = true;
      values.forEach(value => {
        if (value._id === currId) {
          todo.task = value.task;
        }
      });
    }
    if (newTodo.task) toDos.push(newTodo);

    taskPackage.save().then(_ => {
      res.redirect(`/project/show/${req.params.projectId}`);
    });
  });
});

module.exports = router;
