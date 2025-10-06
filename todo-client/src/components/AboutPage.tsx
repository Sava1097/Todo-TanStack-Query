import { useTranslation } from "react-i18next"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-dvh lg:h-auto flex flex-col items-center justify-center gap-2 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl text-center font-bold">About This App</h2>
      <p className="text-gray-700 text-center lg:text-2xl">
        {t("about_des")}
      </p>
    </div>
    )
}
