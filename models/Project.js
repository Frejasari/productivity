const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    plannedCompletion: { type: Date },
    _collaborators: [Schema.Types.ObjectId],
    _taskPackages: [Schema.Types.ObjectId]
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
