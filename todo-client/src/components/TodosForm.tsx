import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CirclePlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { UseMutationResult } from '@tanstack/react-query';
import type { Task } from '@/api/axiosRequests';

type TodosFormProps = {
  addMutation: UseMutationResult<Task, unknown, string, { prevTasks: Task[] }>;
};

export const TodosForm = ({ addMutation }: TodosFormProps) => {
  const { t } = useTranslation();
  const [newTask, setNewTask] = useState('');

  const handlerAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return toast.error(t('task_cant_be_empty'));

    addMutation.reset();

    addMutation.mutate(newTask, {
      onSuccess: () => toast.success(t('success')),
      onError: () => toast.error(t('ooopss')),
      onSettled: () => setNewTask(''),
    });
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-2.5 p-2 md:flex-row md:justify-between mb-2"
        onSubmit={handlerAddTodo}
      >
        <Input
          className="
            text-base 
            p-2
            md:text-lg
            md:p-3
            lg:text-xl
            lg:p-6 
            rounded-xl
            shadow-sm
            focus-visible:shadow-lg
            focus-visible:ring-2
            focus-visible:ring-primary/40
            focus-visible:scale-[1.01]
            transition-all
            duration-200"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
          placeholder={t('enter_new_task')}
        />
        <Button
          className="mx-auto md:mx-0 rounded-lg text-base py-2 md:text-lg md:py-3 hover:cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          type="submit"
          disabled={addMutation.isPending}
        >
          {t('add_task')} <CirclePlus />
        </Button>
      </form>

      {addMutation.isPending && (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-green-500">{t('adding_todo')}...</p>
          <Loader2 className="animate-spin text-green-600 w-4 h-4" />
        </div>
      )}
    </>
  );
};
