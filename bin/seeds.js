const mongoose = require('mongoose');

const Project = require('../models/Project');
const User = require('../models/User');
const Package = require('../models/TaskPackage');

const dbName = 'productivity';
mongoose.connect(`mongodb://localhost/${dbName}`);


const projects = [
  {
    name: "Clean the apartment",
    description: "Wash the dishes, do laundry, and mop the floors.",
    startDate: Date.now(),
    plannedCompletion: Date.now()
  },
 {
    name: "Finish Daily exercise from ironhack",
    description: "Finish my exercise.",
    startDate: Date.now(),
    plannedCompletion: Date.now()
  },
  {
    name: "Some Project",
    description: "bla bla.",
    startDate: Date.now(),
    plannedCompletion: Date.now()
  } 
]

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
  },
]

const users = [
  {
    username: "Anna",
    email: "anna.testuser@abc.de",
    password: "ABCD",
    imgUrl: "/pics/default-silhouette" // add default!
  },
  {
    username: "Lisa",
    email: "lisa.testuser@abc.de",
    password: "123",
    imgUrl: "/pics/default-silhouette" // add default!
  },
  {
    username: "Meg",
    email: "meg.testuser@abc.de",
    password: "ImADog",
    imgUrl: "/pics/default-silhouette" // add default!
  }
];

// seed the database:
Promise.all([Project.create(projects), Package.create(packages), User.create(users)])
.then(values => {
  console.log("Database was successfully seeded!"); 
  mongoose.connection.close()
})
.catch((err) => { 
  console.log(err);
})
