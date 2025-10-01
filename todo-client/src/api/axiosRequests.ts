import axios from "axios";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

const apiUrl = axios.create({
  baseURL:  import.meta.env.VITE_API_URL, // backend
});

// get all tasks
export const getAllTasks = async () => {
  const { data } = await apiUrl.get<Task[]>("/tasks");
  return data;
};    

// add task
export const addTask = async (title: string) => {
  const {data} = await apiUrl.post<Task>("/tasks", { title });
  return data;
};

// edit task
export const toggleTask = async (id: number) => {
  const { data } = await apiUrl.patch<Task>(`/tasks/${id}`);
  return data;
};

// delete task 
export const deleteTask = async (id: number) => {
  await apiUrl.delete<Task>(`/tasks/${id}`);
};
