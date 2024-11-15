import { useState, type FormEvent } from "react";
import { useAllTasks } from "@/hooks/useGetAllTasks";
import { useAddTask } from "@/hooks/useAddTask";
import { useToggleTask } from "@/hooks/useToggleTask";
import { useRemoveTask } from "@/hooks/useRemoveTask";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { X, CirclePlus, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

export function Todos() {
  const { data: tasks, isLoading, isError } = useAllTasks();
  const addMutation = useAddTask();
  const toggleMutation = useToggleTask();
  const removeMutation = useRemoveTask();

  const [newTask, setNewTask] = useState("");

  const handlerAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast.error("Task can't be empty");
      return;
    }

    addMutation.reset();

    addMutation.mutate(newTask, {
      onSuccess: () => toast.success("✅ Success! Task added"),
      onError: () => toast.error("Ooopss, something went wrong"),
      onSettled: () => setNewTask(""),
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-green-600 w-12 h-12" />
      </div>
    );

  if (isError)
    return (
      <Alert className="flex flex-col justify-center items-center" variant="destructive">
        <AlertTitle>Network error...</AlertTitle>
        <AlertDescription>Failed to load todos</AlertDescription>
      </Alert>
    );

  return (
    <div className="md:min-h-screen bg-gray-50 flex md:items-center lg:items-start justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Todo List
          </CardTitle>
        </CardHeader>
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
              className="w-1/2 mx-auto md:mx-0 md:w-1/3 rounded-lg text-base py-2 md:text-lg md:py-3 lg:text-xl lg:py-4 hover:cursor-pointer"
              type="submit"
              disabled={addMutation.isPending}
            >
              Add task <CirclePlus />
            </Button>
          </form>

          {addMutation.isPending && (
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-green-500">Adding todo...</p>
              <Loader2 className="animate-spin text-green-600 w-4 h-4" />
            </div>
          )}

          {addMutation.isError && (
            <p className="text-red-600 text-center">
              Failed to add task, try again
            </p>
          )}

          {removeMutation.isError && (
            <p className="text-red-600 text-center">
              Failed to delete task
            </p>
          )}

          <ul className="p-2">
            {tasks?.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center rounded-lg lg:text-3xl bg-white p-2 lg:p-4 mb-1.5 shadow-sm hover:shadow-md transition"
              >
                <label className="flex gap-3 justify-center items-center lg:gap-6">
                  <Checkbox
                    className="h-5 w-5 lg:h-7 lg:w-7 cursor-pointer"
                    checked={todo.completed}
                    onCheckedChange={() =>
                      toggleMutation.mutate(todo.id, {
                        onError: () => toast.error("Failed to change state"),
                      })
                    }
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
                  onClick={() => removeMutation.mutate(todo.id)}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
