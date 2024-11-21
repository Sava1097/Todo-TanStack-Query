// src/config.ts
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().nonempty('VITE_API_URL must be provided and be a valid URL'),
  // here you can add another VITE-variable if need
  // VITE_SOME_FLAG: z.enum(["on","off"]).optional(),
});

export type Env = z.infer<typeof envSchema>;

// collect point from Vite (import.meta.env)
const rawEnv = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  // VITE_SOME_FLAG: import.meta.env.VITE_SOME_FLAG,
};

// parsing and validation
export const env = envSchema.parse(rawEnv);

export const config = {
  apiUrl: env.VITE_API_URL,
};
