import { useQuery } from '@tanstack/react-query';
import { getAllTasks } from '@/api/axiosRequests';
import type { Task } from '@/api/axiosRequests';

export function useGetAllTasks() {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  });
}
