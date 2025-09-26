import axios from "axios";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

const apiUrl = axios.create({
  baseURL: "http://localhost:4000", // backend
});

// get all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  const { data } = await apiUrl.get("/tasks");
  return data;
};

// add task
export const addTask = async (title: string): Promise<Task> => {
  const {data} = await apiUrl.post("/tasks", { title });
  return data;
};

// edit task
export const toggleTask = async (id: number): Promise<Task> => {
  const { data } = await apiUrl.patch(`/tasks/${id}`);
  return data;
};

// delete task 
export const deleteTask = async (id: number): Promise<void> => {
  await apiUrl.delete(`/tasks/${id}`);
};
