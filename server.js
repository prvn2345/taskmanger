const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;


const TASKS_FILE = path.join(__dirname, "public", "tasks.json");

app.use(cors({ origin: "http://localhost:3002" }));
app.use(express.json());


function readTasks() {
  const data = fs.readFileSync(TASKS_FILE, "utf-8");
  return JSON.parse(data);
}


function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


app.post("/api/tasks", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    dueDate: req.body.dueDate,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});


app.put("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks[index] = { ...tasks[index], ...req.body, id };
  writeTasks(tasks);
  res.json(tasks[index]);
});


app.delete("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const id = parseInt(req.params.id);
  const filtered = tasks.filter((t) => t.id !== id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: "Task not found." });
  }

  writeTasks(filtered);
  res.json({ message: "Task deleted." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
