import { createEnv } from '@t3-oss/env-core'
import { config } from 'dotenv'
import { z } from 'zod'

config()

export const env = createEnv({
  clientPrefix: '',
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(3001),
    DATABASE_URL: z.string().url().min(1),
    SUPABASE_URL: z.string().url().min(1),
    SUPABASE_PUBLIC_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: process.env,
})
