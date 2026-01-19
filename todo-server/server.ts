import express from "express";
import type { Request, Response } from "express"; 
import cors from "cors";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory database
let tasks: Task[] = [];
let currentId = 1;

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Todo API working! Use /tasks");
});

app.get("/tasks", (_req: Request, res: Response) => {
  res.json(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask: Task = {
    id: currentId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const exists = tasks.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});