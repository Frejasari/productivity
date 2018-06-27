const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const TaskPackage = require("../models/TaskPackage");

router.get("/show/:projectId", (req, res, next) => {
  Project.findById(req.params.projectId).then(project => {
    TaskPackage.find({'_id': { $in: project._taskPackages}})
    .then( packages => {
      res.render("project/project",{project, packages});
    });
  });
});

module.exports = router;
