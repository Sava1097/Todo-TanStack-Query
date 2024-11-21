import axios from 'axios';
import { config } from '@/config';

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const api = axios.create({
  baseURL: config.apiUrl, // backend
});

// get all tasks
export const getAllTasks = async () => {
  const { data } = await api.get<Task[]>('/tasks');
  return data;
};

// add task
export const addTask = async (title: string) => {
  const { data } = await api.post<Task>('/tasks', { title });
  return data;
};

// edit task
export const toggleTask = async (id: number) => {
  const { data } = await api.patch<Task>(`/tasks/${id}`);
  return data;
};

// delete task
export const deleteTask = async (id: number) => {
  await api.delete<Task>(`/tasks/${id}`);
};
