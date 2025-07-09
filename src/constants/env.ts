import { z } from 'zod';

const EnvSchema = z.object({
  HOST: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  PORT: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
