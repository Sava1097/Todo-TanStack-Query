import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '@/api/axiosRequests';
import { nanoid } from 'nanoid';
import type { Task } from '@/api/axiosRequests';

export function useAddTask() {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onMutate: async (title: string) => {
      await queryCLient.cancelQueries({ queryKey: ['tasks'] });

      const prevTasks = queryCLient.getQueryData<Task[]>(['tasks']) || [];

      const optimisticTodo: Task = {
        id: -1,
        clientId: nanoid(),
        title,
        completed: false,
        status: 'pending'
      };

      queryCLient.setQueryData<Task[]>(['tasks'], [...prevTasks, optimisticTodo]);

      return { prevTasks, clientId: optimisticTodo.clientId };
    },

    onSuccess(serverTask, _title, context) {
      queryCLient.setQueryData<Task[]>(['tasks'], tasks =>
        tasks?.map(task =>
          task.clientId === context?.clientId
            ? {
            ...task,               
            id: serverTask.id,      
            completed: serverTask.completed,
            status: 'synced', 
            }
            : task
        )
      );
    },

    onError: (err, _title, context) => {
      if (context?.prevTasks) {
        queryCLient.setQueryData(['tasks'], context.prevTasks);
      }
      throw err;
    },
  });
}
