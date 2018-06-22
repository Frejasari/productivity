# Models / Schemas

# User
  - _id
  - name {type: String, unique: true, required: true}
  - email {type: String}
  - imgUrl {type: String, default: ....}
  - password {type: String, required: true}
  - _projects: [_id]

# Project
  - _id
  - name {type: String, required: true}
  - description {type: String}
  - startDate {type: Date}
  - _collaborators: [_id]
  - _taskPackages: [_id]
  # ------- MVP ------- 
    # maybe we find an API where we can ask for color schemes, so we can choose the backgroundColors and TaskPackageColors according to that in the view? I like monochrome Designs
  - ((backgroundColor: {type: String}))
  - ((endDate {type: Date}))
  - ((_admins: [_id]))

# TaskPackage | Idea
  - _id
  - name {type: String, required: true}
  - description {type: String}
  - status {type: String, enum:["Inactive", "Active", "Done"]}
  - toDos [ToDos] (-> Is this possible?!)

# ToDo
  - _id
  - description {type: String, required: true}
  - isDone {type: Boolean, required: true}