import { useTranslation } from 'react-i18next';
import { useGetAllTasks } from '@/hooks/useGetAllTasks';
import { useAddTask } from '@/hooks/useAddTask';
import { useToggleTask } from '@/hooks/useToggleTask';
import { useRemoveTask } from '@/hooks/useRemoveTask';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { TodosForm } from './TodosForm';
import { TodoLIst } from './TodosList';
import { TodosLoading } from './TodosLoading';
import { LoadingError } from './LoadingError';

export const Todos = () => {
  const { t } = useTranslation('todos');

  const { data: tasks, isLoading, isLoadingError } = useGetAllTasks();
  const addMutation = useAddTask();
  const toggleMutation = useToggleTask();
  const removeMutation = useRemoveTask();

  if (isLoading) return <TodosLoading/>

  if (isLoadingError) return <LoadingError/>

  return (
    <div className="md:min-h-1 bg-background flex md:items-center lg:items-start justify-center p-4">
      <Card className="w-full max-w-lg lg:min-w-2/5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-foreground">
            {t('todo_list')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TodosForm addMutation={addMutation} />
          <TodoLIst
            tasks={tasks ?? []}
            toggleMutation={toggleMutation}
            removeMutation={removeMutation}
          />
        </CardContent>

        <CardFooter className="flex justify-center items-center dark:text-foreground md:text-xl py-1">
          {!tasks?.length && (
            <div className="text-xl lg:text-3xl text-center dark:text-foreground">{t('empty')}</div>
          )}

          {!!tasks?.length && (
            <p>{t('tasks_left', { count: tasks.filter((task) => !task.completed).length })}!</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
