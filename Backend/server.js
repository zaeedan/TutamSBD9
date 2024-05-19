const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const repo = require('./repositories/todos');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI);

app.get('/api/todos', repo.getAllTodos);
app.post('/api/todos', repo.addNewTodo);
app.delete('/api/todos/:id', repo.deleteTodoById);
app.put('/api/todos/:id', repo.updateTodoById);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});