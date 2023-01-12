// mongoose모듈
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completed: Boolean,
    uid: String,
    // objectId를 통해서 다름 Model접금

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { colletion: "todos" }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
