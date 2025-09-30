import { Link, Outlet } from "@tanstack/react-router"

// TODO: this isn't used anywhere
export default function Root() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
        <h1 className="text-xl font-bold">Todo App</h1>
        <nav className="flex gap-4">
          <Link to="/" className="[&.active]:text-blue-600 hover:underline">
            Home
          </Link>
          <Link to="/about" className="[&.active]:text-blue-600 hover:underline">
            About
          </Link>
        </nav>
      </header>
        <main className="p-6">
          <Outlet />
        </main>
    </div>
  )
}