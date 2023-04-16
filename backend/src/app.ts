import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Application } from 'express'

import { appRouter } from './router'
import { createContext } from './trpc'

const startApp = async ({ port }: { port: number }) => {
  const app: Application = express()

  app.use(express.json())
  app.use(cors())

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }))

  return app.listen(port)
}

export default startApp
