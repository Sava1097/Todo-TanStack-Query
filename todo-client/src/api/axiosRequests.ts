import axios from "axios";

// TODO: no need to call file as "axiosTasks" cause "axios" is about implementation
// but file names should be more descriptive about the purpose
export type Task = {
  id: number;
  title: string;
  completed: boolean;
}

const apiUrl = axios.create({
  // TODO: get this from the .env file
  baseURL: "http://localhost:4000", // backend
});

// get all tasks
export const getAllTasks = async () => {
  // TODO: I'm not sure if that work, but axios' methods should be generic
  // and it's better to pass the type as a generic parameter
  // apply same changes to other functions
  const { data } = await apiUrl.get<Task[]>("/tasks");
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
