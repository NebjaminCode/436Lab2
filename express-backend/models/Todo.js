const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: String, required: true },
  dateCompleted: { type: String, default: "N/A" },
  complete: { type: Boolean, required: true, default: false},
});

module.exports = mongoose.model("Todo", todoSchema);
