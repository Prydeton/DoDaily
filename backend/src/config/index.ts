import { config } from 'dotenv'

export const env = process.env.NODE_ENV || 'development'

config()

export const port = process.env.PORT ?? '3001'
