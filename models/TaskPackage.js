const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    isKeyFeature: { type: Boolean, default: true },
    status: { type: String, enum: ["Inactive", "Active", "Done"] },
    toDos: [
      {
        task: { type: String, required: true },
        isDone: { type: Boolean, required: true, default: false }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
