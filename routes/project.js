const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const TaskPackage = require("../models/TaskPackage");

router.get("/:projectId", (req, res, next) => {
  res.render("project/project");
  // Project.findById(req.params.project).then(project => {
  // });
});

module.exports = router;
