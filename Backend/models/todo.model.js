const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  responsible: { type: String, required: true },
  priority: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;