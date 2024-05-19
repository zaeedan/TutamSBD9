const mongoose = require('mongoose');
let Todo = require('../models/todo.model');

// menampilkan semua todos
async function getAllTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

// menambahkan todo baru
async function addNewTodo(req, res) {
  try { 
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      responsible: req.body.responsible,
      priority: req.body.priority,
      completed: req.body.completed
    });
    const savedTodo = await todo.save();
    res
    .status(201)
    .json({ message: "List baru berhasil ditambahkan", data: savedTodo });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

//menghapus todo
async function deleteTodoById(req, res) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res
    .status(200)
    .json({ message: "List berhasil dihapus", data: todo });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

// mengupdate todo
async function updateTodoById(req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.responsible = req.body.responsible;
    todo.priority = req.body.priority;
    todo.completed = req.body.completed;
    const savedTodo = await todo.save();
    res
    .status(200)
    .json({ message: "List berhasil diupdate", data: savedTodo });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
}

module.exports = {
  getAllTodos,
  addNewTodo,
  deleteTodoById,
  updateTodoById
};