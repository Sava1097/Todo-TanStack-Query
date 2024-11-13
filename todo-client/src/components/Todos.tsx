import { useState, type FormEvent } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { X } from "lucide-react";
import { CirclePlus } from "lucide-react";

export function Todos() {
  const { taskQuery, addMutationTodo, toggleMutationTodo, removeMutationTodo } = useTodos();
  const [newTask, setNewTask] = useState("");

  const handlerAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return alert("Task can't be empty");

    addMutationTodo.reset()

    addMutationTodo.mutate(newTask, {
      onSettled: () => setNewTask(""),
    });
  };

  if (taskQuery.isLoading) return <p className="text-green-600 text-2xl text-center">Loading...</p>;
  if (taskQuery.isError) return <p className="text-red-600 text-2xl text-center">Failed to load todos</p>;
  
  return (
    <div className="md:min-h-screen bg-gray-50 flex md:items-center lg:items-start justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Todo List
          </CardTitle>
        <CardHeader/>
        <CardContent>
          <form
            className="flex flex-col gap-2 p-2 md:flex-row md:justify-between mb-2"
            onSubmit={handlerAddTodo}
          >
            <Input
              className="text-base p-2 md:text-lg md:p-3 lg:text-xl lg:p-4"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
              placeholder="Enter new task"
            />
            <Button
              className="w-1/2 mx-auto md:mx-0 md:w-1/3 rounded-lg text-base  py-2 md:text-lg md:py-3 lg:text-xl lg:py-4 hover:cursor-pointer"
              type="submit"
            >
              Add task <CirclePlus/>
            </Button>
          </form>

          {addMutationTodo.isPending? <p className="text-green-600">adding todo...</p> : ""}
          {addMutationTodo.isError? <p className="text-red-600">Failed to add task, try again</p> : ""}

          {toggleMutationTodo.isError && <p className="text-red-600">Toggle error</p> }
          {removeMutationTodo.isError && <p className="text-red-600">Failed to delete task</p>}

          <ul className="p-2">
            {taskQuery.data?.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center rounded-lg lg:text-3xl bg-white p-2 lg:p-4 mb-1.5 shadow-sm hover:shadow-md transition"
              >
                <label className="flex gap-3 justify-center items-center lg:gap-6">
                  <Checkbox
                    className="lg:h-7 lg:w-7 cursor-pointer"
                    checked={todo.completed}
                    onCheckedChange={() => toggleMutationTodo.mutate(todo.id)}
                  />
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700" 
                    }
                  >
                    {todo.title}
                  </span>
                </label>
                <Button 
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:cursor-pointer hover:scale-110 transition"
                  onClick={() => removeMutationTodo.mutate(todo.id)}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
    </div>
  );
}
