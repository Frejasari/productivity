const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Project = require("../models/Project");
const User = require("../models/User");
const Package = require("../models/TaskPackage");

const dbName = "productivity";
mongoose.connect(process.env.MONGODB_URI);

const projects = [
  {
    name: "Clean the apartment",
    description: "Wash the dishes, do laundry, and mop the floors.",
    startDate: Date.now(),
    plannedCompletion: Date.now(),
    _collaborators: [],
    _taskPackages: []
  },
  {
    name: "Finish Daily exercise from ironhack",
    description: "Finish my exercise.",
    startDate: Date.now(),
    plannedCompletion: Date.now(),
    _collaborators: [],
    _taskPackages: []
  },
  {
    name: "Some Project",
    description: "bla bla.",
    startDate: Date.now(),
    plannedCompletion: Date.now(),
    _collaborators: [],
    _taskPackages: []
  }
];

const packages = [
  {
    name: "Do groceries",
    description: "Buy veggies for dinner",
    deadline: Date.now(),
    isKeyFeature: true,
    status: "Inactive",
    toDos: [
      {
        task: "go to the supermarket",
        isDone: false
      },
      {
        task: "decide what to buy",
        isDone: false
      },
      {
        task: "pay and take everything home ",
        isDone: false
      }
    ]
  },
  {
    name: "Do laundry",
    description: "obvious",
    deadline: Date.now(),
    isKeyFeature: false,
    status: "Inactive",
    toDos: [
      {
        task: "start washing machine",
        isDone: false
      },
      {
        task: "hang everything on rack to dry",
        isDone: false
      }
    ]
  },
  {
    name: "Read daily exercise description",
    description: "obvious",
    deadline: Date.now(),
    isKeyFeature: false,
    status: "Active",
    toDos: [
      {
        task: "open website",
        isDone: true
      },
      {
        task: "read iteration 3 task",
        isDone: false
      }
    ]
  }
];

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const users = [
  {
    username: "Anna",
    email: "anna.testuser@abc.de",
    password: bcrypt.hashSync("ABCD", salt),
    imgUrl: "/images/default-silhouette.jpg",
    _ideas: []
  },
  {
    username: "Lisa",
    email: "lisa.testuser@abc.de",
    password: bcrypt.hashSync("123", salt),
    imgUrl: "/images/default-silhouette.jpg",
    _ideas: []
  },
  {
    username: "Meg",
    email: "meg.testuser@abc.de",
    password: bcrypt.hashSync("ImADog", salt),
    imgUrl: "/images/default-silhouette.jpg",
    _ideas: []
  }
];

User.create(users)
  .then(users => {
    // add user-ids as collaborators to projects array
    projects[0]._collaborators.push(users[0]._id, users[1]._id, users[2]._id);
    projects[1]._collaborators.push(users[0]._id, users[1]._id);
    projects[2]._collaborators.push(users[0]._id);

    // push project into projects array of each teammate
    Project.create(projects).then(projects => {
      projects.forEach(project => {
        project._collaborators.forEach(userId => {
          User.update({ _id: userId }, { $push: { _projects: project } })
            .then(response => console.log("Project ids were added to user!"))
            .catch(err => console.log(err));
        });
      });
      // add packages to the projects they belong to
      Package.create(packages).then(package => {
        Project.update({ name: projects[0].name }, { $push: { _taskPackages: package[0] } }).then(response => {
          Project.update({ name: projects[0].name }, { $push: { _taskPackages: package[1] } }).then(response => {
            Project.update({ name: projects[1].name }, { $push: { _taskPackages: package[2] } }).then(response => {
              // add some packages to users as ideas
              User.update({ username: users[0].username }, { $push: { _ideas: package[0] } }).then(response => {
                console.log("response", response);
                User.update({ username: users[1].username }, { $push: { _ideas: package[1] } }).then(response => {
                  console.log("Database was successfully seeded!");
                });
              });
            });
          });
        });
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
