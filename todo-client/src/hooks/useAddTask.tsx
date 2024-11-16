import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "@/api/axiosRequests";
import type { Task } from "@/api/axiosRequests";

export function useAddTask() {
  const queryCLient = useQueryClient();
    
  return useMutation({
    mutationFn: addTask,
    onMutate: async (title: string) => {
      await queryCLient.cancelQueries({queryKey:(["tasks"])})
      
      const prevTasks = queryCLient.getQueryData<Task[]>(["tasks"]) || [];

      const optimisticTodo: Task = {
        id: Date.now(),
        title,
        completed: false,
      }

      queryCLient.setQueryData<Task[]>(["tasks"], [
        ...prevTasks,
        optimisticTodo,
      ]);  

      return { prevTasks}
    },

    onError:(err, _title, context) => {
      if (context?.prevTasks) {
        queryCLient.setQueryData(["tasks"], context.prevTasks)
      }
      throw err
    },

    onSettled: () => queryCLient.invalidateQueries({queryKey:["tasks"]}) 
  });
}
