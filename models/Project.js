const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    plannedCompletion: { type: Date },
    _collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    _taskPackages: [{ type: Schema.Types.ObjectId, ref: "Package" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
