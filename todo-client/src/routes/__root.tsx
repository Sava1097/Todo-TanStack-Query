import { Outlet, Link } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex justify-center gap-6 p-4 bg-gray-100 shadow">
        <Link to="/" className="[&.active]:font-bold">Todos</Link>
        <Link to="/about" className="[&.active]:font-bold">About</Link>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
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
