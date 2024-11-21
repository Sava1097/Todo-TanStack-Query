import { AnimatePresence } from 'motion/react';
import type { Task } from '@/api/axiosRequests';
import type { UseMutationResult } from '@tanstack/react-query';
import { TodosItem } from './TodosItem';

type TodosListProps = {
  tasks: Task[];
  removeMutation: UseMutationResult<void, Error, number>;
  toggleMutation: UseMutationResult<Task, Error, number>;
};

export const TodoLIst = ({ tasks, removeMutation, toggleMutation }: TodosListProps) => {
  return (
    <>
      <ul className="">
        <AnimatePresence>
          {tasks?.map((todo) => (
            <TodosItem
              key={todo.id}
              todo={todo}
              removeMutation={removeMutation}
              toggleMutation={toggleMutation}
            />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};
