import { useTranslation } from 'react-i18next';
import { useGetAllTasks } from '@/hooks/useGetAllTasks';
import { useAddTask } from '@/hooks/useAddTask';
import { useToggleTask } from '@/hooks/useToggleTask';
import { useRemoveTask } from '@/hooks/useRemoveTask';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TodosForm } from './TodosForm';
import { TodoLIst } from './TodosList';

export const Todos = () => {
  const { t } = useTranslation('todos');

  const { data: tasks, isLoading, isError } = useGetAllTasks();
  const addMutation = useAddTask();
  const toggleMutation = useToggleTask();
  const removeMutation = useRemoveTask();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-green-600 w-12 h-12" />
      </div>
    );

  if (isError)
    return (
      <Alert
        className="flex flex-col justify-center h-screen items-center text-2xl"
        variant="destructive"
      >
        <AlertTitle>{t('network_error')}</AlertTitle>
        <AlertDescription>{t('failed_to_load_todos')}...</AlertDescription>
      </Alert>
    );

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
