import { useTranslation } from "react-i18next";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export const LoadingError = () => {
  const { t } = useTranslation()

   return (
      <Alert
        className="flex flex-col justify-center h-screen items-center text-2xl"
        variant="destructive"
      >
        <AlertTitle>{t('network_error')}</AlertTitle>
        <AlertDescription>{t('failed_to_load_todos')}...</AlertDescription>
      </Alert>
    );
}
