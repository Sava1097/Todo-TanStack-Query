import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation('about');

  return (
    <div className="min-h-dvh lg:h-auto flex flex-col items-center justify-center gap-2 p-6 bg-background shadow rounded-lg">
      <h2 className="text-2xl text-center font-bold">{t('this_app')}</h2>
      <p className="text-gray-600 text-center lg:text-2xl">{t('description')}</p>
    </div>
  );
}
