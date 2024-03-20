// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks');

// ניתוב ליצירת משימה חדשה
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, dueDate, userId } = req.body;
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      userId
    });
    await task.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ניתוב לקבלת כלל המשימות
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ניתוב לקבלת משימה לפי המזהה
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ניתוב לעדכון משימה לפי המזהה
router.patch('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "status", "dueDate"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId }, // Filter by ID only
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ניתוב למחיקת משימה לפי המזהה
router.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(taskId); // Find and delete by ID only

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
