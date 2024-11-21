// server.ts
var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 4000;
// middlewares
app.use(cors());
app.use(express.json());
app.get("/", function (_req, res) {
    res.send("✅ Todo API working! Use /tasks");
});
// in-memory tasks
var tasks = [];
var currentId = 1;
// ✅ Get all tasks
app.get("/tasks", function (req, res) {
    res.json(tasks);
});
// ✅ Add task
app.post("/tasks", function (req, res) {
    var title = req.body.title;
    if (!title) {
        return res.status(500).json({ error: "Title is required" });
    }
    var newTask = {
        id: currentId++,
        title: title,
        completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// ✅ Toggle completed
app.patch("/tasks/:id", function (req, res) {
    var id = Number(req.params.id);
    var task = tasks.find(function (t) { return t.id === id; });
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    task.completed = !task.completed;
    res.json(task);
});
// ✅ Delete task
app.delete("/tasks/:id", function (req, res) {
    var id = Number(req.params.id);
    var exists = tasks.some(function (t) { return t.id === id; });
    if (!exists) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks = tasks.filter(function (t) { return t.id !== id; });
    res.status(204).send();
});
// ✅ Start server
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server running at http://localhost:".concat(PORT));
});
