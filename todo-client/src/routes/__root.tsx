import { Outlet, Link } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";
import { Toaster  } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import "../i18n"

function RootLayout() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="flex justify-center items-center gap-6 p-4 md:text-2xl bg-gray-100 shadow">
        <Link to="/" className="[&.active]:font-bold">{t("todos")}</Link>
        <Link to="/about" className="[&.active]:font-bold">{t("about")}</Link>
        <LanguageSwitcher/>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
        <Toaster/>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="text-center text-red-600 text-lg">
      <p>Oops! Page not found 🚧</p>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
