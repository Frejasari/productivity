const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    imgUrl: { type: String, default: "/images/default-silhouette.jpg" },
    _projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    _ideas: [{ type: Schema.Types.ObjectId, ref: "Package" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
