import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllTasks, addTask, toggleTask, deleteTask } from "../api/axiosRequests";
import type { Task } from "../api/axiosRequests";

export function useTodos() {
  const queryClient = useQueryClient();

  //get all Tasks`
  const taskQuery = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn:getAllTasks  
  })

  //add Task
  const addMutationTodo = useMutation({
    mutationFn: addTask,
    onMutate: async (title: string) => {
      await queryClient.cancelQueries({queryKey:['tasks']});

      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];
      
      const optimisticTodo: Task = {
        id: Date.now(),
        title,
        completed:false,
      }

      queryClient.setQueryData<Task[]>(['tasks'], [
        ...prevTasks,
        optimisticTodo
      ])

      return {prevTasks}
    },
    onError:(err, _title, context) => {
      if(context?.prevTasks) {
        queryClient.setQueryData(['tasks'],context.prevTasks)
      }
      throw err
    },
    onSettled: () => queryClient.invalidateQueries({queryKey:['tasks']})
  })

  // toggle completed or uncompleted
  const toggleMutationTodo = useMutation({
    mutationFn: toggleTask,
    onMutate: async (id:number) => {
      await queryClient.cancelQueries({queryKey:['tasks']});

      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];

      queryClient.setQueryData<Task[]>(
        ['tasks'],
        prevTasks.map((todo) => 
          todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
      );

      return {prevTasks}
    },
    onError: (err, _id, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(['tasks'], context.prevTasks)
      }
      throw err
    },
    onSettled: () =>  queryClient.invalidateQueries({queryKey:['tasks']})
  })

  //delete task 

  const removeMutationTodo = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({queryKey:['tasks']})
      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || [];

      queryClient.setQueryData<Task[]>(
        ['tasks'],
        prevTasks.filter((todo) => todo.id !== id )
      );
      return  { prevTasks }
    },
    onError:(err, _id, context ) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(['tasks'], context.prevTasks)
      }
      throw err 
    }
  })

  // TODO: split into each separate hook
  // otherwise it can become hard to manage and it might cause unnecessary rerenders (we need to discuss it)
  return  {taskQuery, addMutationTodo, toggleMutationTodo, removeMutationTodo} 
}
