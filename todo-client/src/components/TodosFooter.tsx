import { useTranslation } from "react-i18next"
import  type { Task } from "@/api/axiosRequests"

type TodosFooterProps = {
  tasks: Task[]
}

export const TodosFooter = ({tasks}: TodosFooterProps) => {
  const { t } = useTranslation()

  if (!tasks?.length) return <div className="text-xl lg:text-3xl text-center dark:text-foreground">{t('empty')}</div>
  
  return (
    <p>{t('tasks_left', { count: tasks.filter((task) => !task.completed).length })}!</p>
  )
  
}
