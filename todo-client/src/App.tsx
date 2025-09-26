import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTodos } from './hooks/useTodos';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox' ;
import './App.css'

function App() {
  const { taskQuery, addMutationTodo, toggleMutationTodo, removeMutationTodo } = useTodos()
  const [newTask, setNewTask] = useState('');

  const handlerAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return alert("task cant be empty");
    addMutationTodo.mutate(newTask, {
      onSettled: () => setNewTask('')
    })
  }

    if (taskQuery.isLoading) return <p className='text-green-600 text-2xl text-center'>Loading...</p>
    if (taskQuery.isError) return <p className='text-red-600 text-2xl text-center'>Failed to load todos</p>

  return (
    <div className="md:min-h-screen bg-gray-50 flex md:items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
             Todo List
          </CardTitle>
          <CardContent>
            <form
              className='flex flex-col gap-2 md:flex-row md:justify-between mb-2' 
              onSubmit={handlerAddTodo}>
                <Input 
                  type='text'
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  required
                  placeholder='enter new task'
                />
                <Button
                  className='w-1/2 mx-auto md:mx-0 md:w-1/3 rounded-lg' 
                  type='submit'>Add task</Button>
            </form>
            <ul className='p-2'>
              {taskQuery.data?.map((todo) => 
                <li className='flex justify-between items-center rounded-lg bg-white p-2 mb-1.5 shadow-sm hover:shadow-md transition' key={todo.id}>
                  <label className='flex gap-3 items-center'>
                    <Checkbox
                      className='w-5 h-5'
                      checked={todo.completed} 
                      onCheckedChange={() => toggleMutationTodo.mutate(todo.id)}
                    />
                    <span
                      className={todo.completed ? 'line-through text-gray-400' : 'text-gray-700'} 
                    >
                     {todo.title}
                    </span>
                  </label>
                  <Button
                    variant='ghost'  
                    className='text-red-500 hover:text-red-700 hover:cursor-pointer hover:scale-110 transition'
                    onClick={() => removeMutationTodo.mutate(todo.id)}>
                      [x]
                  </Button>
                </li>
              )}
            </ul>
          </CardContent>
        </CardHeader>
      </Card>  
    </div>
  )
}

export default App
