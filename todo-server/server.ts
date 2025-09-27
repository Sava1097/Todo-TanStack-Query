// server.ts
const express = require("express");
const cors = require("cors");

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const app = express();
const PORT = 4000;

// middlewares
app.use(cors());
app.use(express.json());


app.get("/", (_req: any, res: any) => {
  res.send("✅ Todo API работает! Используй /tasks");
});

// in-memory tasks
let tasks: Task[] = [];
let currentId = 1;

// ✅ Get all tasks
app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});

// ✅ Add task
app.post("/tasks", (req: any, res: any) => {
  const { title } = req.body;
  if (!title) {
    return res.status(500).json({ error: "Title is required" });
  }

  const newTask: Task = {
    id: currentId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ Toggle completed
app.patch("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
});

// ✅ Delete task
app.delete("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const exists = tasks.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
