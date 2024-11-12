import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';

const todosQuery = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={todosQuery}>
      <App />
    </QueryClientProvider>
)
