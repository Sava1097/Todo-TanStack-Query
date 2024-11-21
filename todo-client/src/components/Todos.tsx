import { useTranslation } from "react-i18next";
import { useState, type FormEvent } from "react";
import { useAllTasks } from "@/hooks/useGetAllTasks";
import { useAddTask } from "@/hooks/useAddTask";
import { useToggleTask } from "@/hooks/useToggleTask";
import { useRemoveTask } from "@/hooks/useRemoveTask";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { X, CirclePlus, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const Todos = () => {
  const { t } = useTranslation("todos");

  const { data: tasks, isLoading, isError } = useAllTasks();
  const addMutation = useAddTask();
  const toggleMutation = useToggleTask();
  const removeMutation = useRemoveTask();

  const [newTask, setNewTask] = useState("");

  const handlerAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return toast.error(t("task_cant_be_empty"));
      
    addMutation.reset();

    addMutation.mutate(newTask, {
      onSuccess: () => toast.success(t("success")),
      onError: () => toast.error(t("ooopss")),
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
      <Alert className="flex flex-col justify-center h-screen items-center text-2xl" variant="destructive">
        <AlertTitle>{t("network_error")}</AlertTitle>
        <AlertDescription>{t("failed_to_load_todos")}...</AlertDescription>
      </Alert>
    );

  return (
    <div className="md:min-h-1 bg-background flex md:items-center lg:items-start justify-center p-4">
      <Card className="w-full max-w-lg lg:min-w-2/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-foreground">
            {t("todo_list")} 
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col items-center gap-2.5 p-2 md:flex-row md:justify-between mb-2"
            onSubmit={handlerAddTodo}
          >
            <Input
              className="text-base p-2 md:text-lg md:p-3 lg:text-xl lg:p-4"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
              placeholder={t('enter_new_task')}
            />
            <Button
              className="mx-auto md:mx-0 rounded-lg text-base py-2 md:text-lg md:py-3 hover:cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
              type="submit"
              disabled={addMutation.isPending}
            >
              {t("add_task")} <CirclePlus />
            </Button>
          </form>

          {addMutation.isPending && ( 
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-green-500">{t('adding_todo')}...</p>
              <Loader2 className="animate-spin text-green-600 w-4 h-4" />
            </div>
          )}

          {removeMutation.isError && (
            toast.error(t("failed_to_delete_task"))
          )}

          <ul className="p-2">
            <AnimatePresence>
              {tasks?.map((todo) => (
                <motion.li
                  key={todo.id}
                  layout="position"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -70 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-center rounded-lg lg:text-3xl bg-background p-2 lg:p-4 mb-1.5 shadow-sm hover:shadow-md transition"
                >
                  <label className="flex gap-3 justify-center items-center lg:gap-6">
                    <Checkbox
                      className="h-5 w-5 lg:h-7 lg:w-7 cursor-pointer"
                      checked={todo.completed}
                      onCheckedChange={() =>
                        toggleMutation.mutate(todo.id, {
                          onError: () => toast.error(t("failed_to_change_state")),
                        })
                      }
                    />
                    <span
                      className={`
                        hover:cursor-pointer
                        ${todo.completed ? "line-through text-gray-400" : "text-foreground"}
                      `}
                    >
                      {todo.title}
                    </span>
                  </label>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer hover:scale-110 transition"
                    onClick={() => removeMutation.mutate(todo.id, {
                      onSuccess: () => toast.success(t("task_deleted"))
                    })}
                  >
                    <X />
                  </Button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {!tasks?.length && (
             <div className="text-xl lg:text-3xl text-center dark:text-foreground">{t("empty")}</div>
          )}

        </CardContent>
        <CardFooter className="flex justify-center items-center dark:text-foreground md:text-xl py-1">
          {!!tasks?.length && (
            <p>
              {t("tasks_left", { count: tasks.filter((task) => !task.completed).length })}! 
            </p>
          )}
        </CardFooter>
      </Card> 
    </div>
  );
}
