import { useTranslation } from "react-i18next"

export const TodosTitle = () => {
  const {t} = useTranslation()

  return t('todo_list') 

}
