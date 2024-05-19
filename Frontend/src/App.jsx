import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';
import Profile from './pages/Profile'; // Import the Profile component

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    responsible: '',
    priority: 'Low',
    completed: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isEditing ? `/api/todos/${tasks[currentTaskIndex]._id}` : '/api/todos';
    const method = isEditing ? 'put' : 'post';

    try {
      await axios({
        method: method,
        url: url,
        data: newTask,
      });

      fetchTasks(); // Refresh tasks after submit

      setNewTask({
        title: '',
        description: '',
        responsible: '',
        priority: 'Low',
        completed: false,
      });
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDelete = async (index) => {
    const url = `/api/todos/${tasks[index]._id}`;

    try {
      await axios.delete(url);
      fetchTasks(); // Refresh tasks after delete
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (index) => {
    const updatedTask = {
      ...tasks[index],
      completed: !tasks[index].completed,
    };
    const url = `/api/todos/${tasks[index]._id}`;

    try {
      await axios.put(url, updatedTask);
      fetchTasks(); // Refresh tasks after toggle complete
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  return (
    <Router>
      <div className="container mx-auto p-4 bg-gray-900 pt-24 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4">
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    className="p-2 rounded-lg shadow-lg border border-gray-300 bg-gray-800 text-white"
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    className="p-2 rounded-lg shadow-lg border border-gray-300 bg-gray-800 text-white"
                    placeholder="Description"
                    required
                  />
                  <input
                    type="text"
                    name="responsible"
                    value={newTask.responsible}
                    onChange={handleChange}
                    className="p-2 rounded-lg shadow-lg border border-gray-300 bg-gray-800 text-white"
                    placeholder="Responsible"
                    required
                  />
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    className="p-2 rounded-lg shadow-lg border border-gray-300 bg-gray-800 text-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <button type="submit" className="p-2 rounded-full bg-blue-500 text-white">
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                </form>

                <div id="task-list" className="mx-auto w-1/2 grid grid-cols-1 gap-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col bg-gray-800">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={task.completed ? "line-through" : ""}>{task.title}</span>
                          <div>
                            <small className="text-black-500">{task.description}</small>
                            <br />
                            <small className="text-gray-500">Responsible: {task.responsible}</small>
                            <br />
                            <small className="text-gray-500">Priority: {task.priority}</small>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleComplete(index)}
                        className={`mt-2 p-1 rounded-lg text-white ${task.completed ? 'bg-green-500' : 'bg-gray-500'}`}
                      >
                        {task.completed ? 'Completed' : 'Mark as Complete'}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
