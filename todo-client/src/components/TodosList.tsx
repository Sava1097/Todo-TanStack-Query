import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import type { Task } from "@/api/axiosRequests";
import type { UseMutationResult } from "@tanstack/react-query";

type TodosListProps = {
  tasks: Task[];
  removeMutation: UseMutationResult<void, Error, number>;
  toggleMutation: UseMutationResult<Task, Error, number>;
}

export const TodoLIst = ({ tasks, removeMutation,toggleMutation }: TodosListProps) => {
  const { t } = useTranslation()

  return (
    <>
      <ul className="">
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
                      onSuccess: () => toast.success(t("task_deleted")),
                      onError: () => toast.error(t("failed_to_delete_task"))
                    })}
                  >
                    <X/>
                  </Button>
                  
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  )
}