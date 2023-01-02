// mongoose모듈
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completed: Boolean,
  },
  { colletion: "todos" }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
