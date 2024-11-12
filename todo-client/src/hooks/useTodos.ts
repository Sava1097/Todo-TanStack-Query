import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllTasks, addTask, toggleTask, deleteTask } from "../api/axiosTasks";
import type { Task } from "../api/axiosTasks";

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

  return  {taskQuery, addMutationTodo, toggleMutationTodo, removeMutationTodo} 
}
