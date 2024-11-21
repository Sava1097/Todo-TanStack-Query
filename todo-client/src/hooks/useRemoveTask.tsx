import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/api/axiosRequests';
import type { Task } from '@/api/axiosRequests';

export function useRemoveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];

      queryClient.setQueryData<Task[]>(
        ['tasks'],
        prevTasks.filter((todo) => todo.id !== id)
      );

      return { prevTasks };
    },
    onError: (err, _id, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(['tasks'], context.prevTasks);
      }
      throw err;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
