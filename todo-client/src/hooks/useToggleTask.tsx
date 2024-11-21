import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toggleTask } from '@/api/axiosRequests';
import type { Task } from '@/api/axiosRequests';

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];

      queryClient.setQueryData<Task[]>(
        ['tasks'],
        prevTasks.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
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
