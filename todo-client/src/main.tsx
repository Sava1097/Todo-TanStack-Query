import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { RouterProvider, Router } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen.ts';
import "./i18n"

const todosQuery = new QueryClient();
const todosRouter = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof Router;
  }
}

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={todosQuery}>
      <RouterProvider router={todosRouter}/>
    </QueryClientProvider>
)
