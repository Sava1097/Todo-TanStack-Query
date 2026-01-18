Modern Todo Application
A robust and scalable Todo application built with a modern React ecosystem. This project demonstrates high-level state management, optimistic UI updates, and seamless navigation.

🚀 Tech Stack Core: React + TypeScript

Data Fetching: TanStack Query (React Query) — for server state management and caching.

Routing: TanStack Router — for type-safe navigation.

API Client: Axios with centralized configuration.

Validation: Zod (for schema-based API responses).

UI/Styling: Framer Motion (for smooth animations) and CSS Modules/Tailwind.

✨ Key Features
Optimistic UI: Tasks update instantly in the UI while the server request is in progress.

Advanced Caching: Smart data invalidation to keep the UI in sync with the backend.

Type Safety: End-to-end type safety using TypeScript and TanStack primitives.

Multi-language Support: Integrated i18next for localization (i18n).

Theme Switcher: Persistence of user preferences (Light/Dark mode).

🛠️ Architecture Highlights
The project follows a clean component-based architecture, separating concerns between UI, business logic (hooks), and API services. It features:

Separate modules for TodoForm, TodoList, and TodoItem.

Optimized re-renders using selective state updates.

Centralized error handling for API requests.
